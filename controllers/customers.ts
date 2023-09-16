import {
  addNewCustomerUtil,
  deleteCustomerByIdUtil,
  getAllCustomerUtil,
  getCustomerByIdUtil,
  updateCustomerByIdUtil,
} from "../utility/customers";

// signup
export async function addNewCustomer(req: any, res: any) {
  try {
    const customerRegistered: any = await addNewCustomerUtil(req.body);
    if (!customerRegistered?.errors) res.send(customerRegistered);
    else res.status(500).json(customerRegistered);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      errors: [error?.message?.replaceAll("'")],
    });
  }
}

// get all customer
export async function getAllCustomer(req: any, res: any) {
  try {
    const { page = 1, limit = 10, search = null } = req?.query || {};
    const offset = (+page - 1) * +limit;
    const customers = await getAllCustomerUtil(offset, limit, search);
    if (!customers?.errors) res.send(customers);
    else res.status(500).json(customers);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      errors: [error?.message?.replaceAll("'")],
    });
  }
}

// get customer by id
export async function getCustomerById(req: any, res: any) {
  try {
    const customers = await getCustomerByIdUtil(req?.params?.id);
    if (!customers?.errors) res.send(customers);
    else res.status(500).json(customers);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      errors: [error?.message?.replaceAll("'")],
    });
  }
}

// update customer
export async function updateCustomerById(req: any, res: any) {
  try {
    const customers = await updateCustomerByIdUtil(req?.params?.id, req.body);
    if (!customers?.errors) res.send(customers);
    else res.status(500).json(customers);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      errors: [error?.message?.replaceAll("'")],
    });
  }
}

// delete customer
export async function deleteCustomerById(req: any, res: any) {
  try {
    const customers = await deleteCustomerByIdUtil(req?.params?.id);
    if (!customers?.errors) res.send(customers);
    else res.status(500).json(customers);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      errors: [error?.message?.replaceAll("'")],
    });
  }
}
