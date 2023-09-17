import { UUID } from "crypto";
import { customerDefaultFields } from "./CONSTANTS";

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
        createNewCustomerEarningsUtil({ customerId: id });
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
            `failed to register customer account`,
            `Customer profile added successfuly, Profile Id: ${profileAdded?.id}`,
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

function addChildToItsAncestors(childId: UUID, allParents = []) {
  const;
}
