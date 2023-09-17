import { UUID } from "crypto";

const models = require("../libs/shared/src/sequelize/models");
const { products } = models;

export async function addNewProductUtil(productInfo: any) {
  try {
    const productAdded = await products.create(productInfo);
    return { products: [productAdded] };
  } catch (error: any) {
    console.log(error);
    return {
      errors: [error?.message?.replaceAll("'")],
    };
  }
}

// get all customer
export async function getAllProductsUtil(
  offset = 0,
  limit = 10,
  search = null
) {
  try {
    const { count, rows } = await products.findAndCountAll({
      where: { isArchived: null },
      order: [["createdAt", "DESC"]],
      offset,
      limit,
    });
    return {
      count,
      products: rows,
    };
  } catch (error: any) {
    console.log(error);
    return {
      errors: [error?.message?.replaceAll("'")],
    };
  }
}

// get customer by id
export async function getProductByIdUtil(id: UUID) {
  try {
    const product = await products.findOne({
      where: { id, isArchived: null },
    });
    return product
      ? { customers: [product?.get()] }
      : { errors: ["Product not found"] };
  } catch (error: any) {
    return {
      errors: [error?.message?.replaceAll("'")],
    };
  }
}

// update customer
export async function updateProductByIdUtil(id: UUID, productInfo: any) {
  try {
    const [count, product] = await products.update(productInfo, {
      where: { id },
      returning: true,
    });
    return count > 0
      ? { products: product }
      : { errors: ["Product not found"] };
  } catch (error: any) {
    return {
      errors: [error?.message?.replaceAll("'")],
    };
  }
}

// delete customer
export async function deleteProductByIdUtil(id: UUID) {
  try {
    const [count, product] = await products.update(
      { isArchived: new Date().toISOString() },
      { where: { id }, returning: true }
    );
    return count > 0
      ? { products: product }
      : { errors: ["Product not found"] };
  } catch (error: any) {
    return {
      errors: [error?.message?.replaceAll("'")],
    };
  }
}
