import { UUID } from "crypto";
import { customerDefaultFields } from "./CONSTANTS";
import { Op } from "sequelize";
const models = require("../libs/shared/src/sequelize/models");
const { customers, profiles, earnings } = models;

export async function addNewCustomerUtil(customerInfo: any) {
  try {
    const profileAdded = await createNewCustomerProfileUtil(customerInfo);
    if (profileAdded) {
      const password = "123456"; //generateStrongPassword();
      const { productId, parentId, leftChildId, rightChildId, wingSide } =
        customerInfo;
      const customerRegistered = await createNewCustomerAccountUtil({
        password,
        productId,
        parentId,
        leftChildId,
        rightChildId,
        wingSide,
        accountType: "customer",
      });
      if (customerRegistered) {
        const { id, customerId, accountType } = customerRegistered?.get();
        profileAdded.customerId = id;
        await profileAdded.save();
        const earningsCreated = await createNewCustomerEarningsUtil({
          customerId: id,
        });
        if (earningsCreated) {
          const ancestorsAdded = await addAncestorsToCustomer(
            id,
            parentId,
            wingSide
          );
          if (ancestorsAdded) await calculateAncestorsEarnings(ancestorsAdded);
          return {
            customers: [
              {
                ...profileAdded?.get(),
                customerId,
                accountType,
                id,
              },
            ],
          };
        } else {
          return {
            errors: [
              `customer profile created id:` + profileAdded?.id,
              `customer created id:` + id,
              `failed to create customer earnings`,
            ],
          };
        }
      } else {
        return {
          errors: [
            `failed to register customer`,
            `customer profile created id: ${profileAdded?.id}`,
          ],
        };
      }
    } else {
      return {
        errors: ["Something went wrong try again"],
      };
    }
  } catch (error: any) {
    console.log(error);
    return {
      errors: [error?.message?.replaceAll("'")],
    };
  }
}

export async function createNewCustomerProfileUtil(profile: any) {
  try {
    const profileAdded = await profiles.create(profile);
    if (profileAdded) {
      return profileAdded;
    } else {
      return false;
    }
  } catch (error: any) {
    return false;
  }
}

export async function createNewCustomerAccountUtil(accountInfo: any) {
  try {
    const customerRegistered = await customers.create(accountInfo);
    if (customerRegistered) {
      return customerRegistered;
    } else {
      return false;
    }
  } catch (error: any) {
    console.log(error);
    return false;
  }
}

export async function createNewCustomerEarningsUtil(earningsInfo: any) {
  try {
    const earningsCreated = await earnings.create(earningsInfo);
    if (earningsCreated) {
      return earningsCreated;
    } else {
      return false;
    }
  } catch (error: any) {
    console.log(error);
    return false;
  }
}

// get all customer
export async function getAllCustomerUtil(
  offset = 0,
  limit = 10,
  search = null
) {
  try {
    const { count: totalCustomers, rows } = await customers.findAndCountAll({
      where: { isArchived: null },
      attributes: customerDefaultFields,
      order: [["createdAt", "DESC"]],
      offset,
      limit,
    });
    return {
      totalCustomers,
      customers: rows,
    };
  } catch (error: any) {
    console.log(error);
    return {
      errors: [error?.message?.replaceAll("'")],
    };
  }
}

// get customer by id
export async function getCustomerByIdUtil(id: UUID) {
  try {
    const customer = await customers.findOne({
      where: { id, isArchived: null },
      include: [
        {
          model: customers,
          as: "children",
          attributes: ["id", "customerId", "productId", "wingSide"],
          include: [
            {
              model: earnings,
              as: "earnings",
              attributes: ["totalCount", "totalEarn"],
            },
            {
              model: profiles,
              as: "profile",
              attributes: ["firstName"],
            },
          ],
        },
        {
          model: earnings,
          as: "earnings",
          attributes: ["totalCount", "totalEarn"],
        },
        {
          model: profiles,
          as: "profile",
          attributes: ["firstName"],
        },
      ],
      attributes: customerDefaultFields,
    });
    return customer
      ? { customers: [customer?.get()] }
      : { errors: ["Customer not found"] };
  } catch (error: any) {
    return {
      errors: [error?.message?.replaceAll("'")],
    };
  }
}

// update customer
export async function updateCustomerByIdUtil(id: UUID, customerInfo: any) {
  try {
    const [count, customer] = await customers.update(customerInfo, {
      where: { id },
      returning: customerDefaultFields,
    });
    return count > 0
      ? { customers: customer }
      : { errors: ["Customer not found"] };
  } catch (error: any) {
    return {
      errors: [error?.message?.replaceAll("'")],
    };
  }
}

// delete customer
export async function deleteCustomerByIdUtil(id: UUID) {
  try {
    const [count, customer] = await customers.update(
      { isArchived: new Date().toISOString() },
      {
        where: { id, isArchived: null },
        returning: customerDefaultFields,
      }
    );
    return count > 0
      ? { customers: customer }
      : { errors: ["Customer not found"] };
  } catch (error: any) {
    return {
      errors: [error?.message?.replaceAll("'")],
    };
  }
}

// generate strong password
function generateStrongPassword() {
  const length = 8;
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*_-+=";

  const allCharacters = lowercase + uppercase + numbers + symbols;

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allCharacters.length);
    password += allCharacters[randomIndex];
  }

  return password;
}

export async function addAncestorsToCustomer(
  childId: UUID,
  parentId: UUID,
  wingSide: "LEFT" | "RIGHT"
) {
  try {
    const parent = await customers.findByPk(parentId);
    const parentsAncestors = parent?.get("effectiveParents");
    const child = await customers.findByPk(childId);
    child.effectiveParents = [...parentsAncestors, { id: parentId, wingSide }];
    await child.save();
    return [...parentsAncestors, { id: parentId, wingSide }];
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function calculateAncestorsEarnings(
  ancestors: { id: UUID; wingSide: "LEFT" | "RIGHT" }[]
) {
  const finishedParentEarnings: UUID[] = [];
  try {
    const allParents: any = ancestors?.reduce(
      (result, curr) => ({ ...result, [curr?.id]: curr?.wingSide }),
      {}
    );
    //here calculation is done on archived customers also
    const allParentsEarnings = await earnings.findAll({
      where: { customerId: { [Op.in]: Object.keys(allParents) } },
    });

    const calculatedTo = await Promise.allSettled(
      allParentsEarnings.map(async (customerEarnings: any) => {
        customerEarnings.earnedFrom = [
          ...customerEarnings.earnedFrom,
          {
            id: customerEarnings?.customerId,
            wingSide: allParents[customerEarnings?.customerId],
          },
        ];
        ++customerEarnings.totalCount;
        ++customerEarnings.dayTotalCount;
        customerEarnings.totalEarn = customerEarnings.totalEarn + 10;
        customerEarnings.dayTotalEarn = customerEarnings.dayTotalEarn + 10;
        if (allParents[customerEarnings?.customerId] === "LEFT") {
          ++customerEarnings.totalLeftCount;
          ++customerEarnings.dayLeftCount;
          customerEarnings.totalLeftEarn = customerEarnings.totalLeftEarn + 10;
          customerEarnings.dayLeftEarn = customerEarnings.dayLeftEarn + 10;
        } else if (allParents[customerEarnings?.customerId] === "RIGHT") {
          ++customerEarnings.totalRightCount;
          ++customerEarnings.dayRightCount;
          customerEarnings.totalRightEarn =
            customerEarnings.totalRightEarn + 10;
          customerEarnings.dayRightEarn = customerEarnings.dayRightEarn + 10;
        }
        const earn = await customerEarnings.save();
        if (earnings)
          finishedParentEarnings?.push(customerEarnings?.customerId);
        return earn;
      })
    );
    console.log({ finishedParentEarnings });
    return calculatedTo;
  } catch (error) {
    console.log(error);
    console.log({ finishedParentEarnings });
  }
}
