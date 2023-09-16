import {
  addNewProductUtil,
  deleteProductByIdUtil,
  getAllProductsUtil,
  getProductByIdUtil,
  updateProductByIdUtil,
} from "../utility/products";

// create product
export async function createProduct(req: any, res: any) {
  try {
    const productRegistered: any = await addNewProductUtil(req.body);
    if (!productRegistered?.errors) res.send(productRegistered);
    else res.status(500).json(productRegistered);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      errors: [error?.message?.replaceAll("'")],
    });
  }
}

// get all product
export async function getAllProduct(req: any, res: any) {
  try {
    const { page = 1, limit = 10, search = null } = req?.query || {};
    const offset = (+page - 1) * +limit;
    const products = await getAllProductsUtil(offset, limit, search);
    if (!products?.errors) res.send(products);
    else res.status(500).json(products);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      errors: [error?.message?.replaceAll("'")],
    });
  }
}

// get product by id
export async function getProductById(req: any, res: any) {
  try {
    const products = await getProductByIdUtil(req?.params?.id);
    if (!products?.errors) res.send(products);
    else res.status(500).json(products);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      errors: [error?.message?.replaceAll("'")],
    });
  }
}

// update product
export async function updateProduct(req: any, res: any) {
  try {
    const products = await updateProductByIdUtil(req?.params?.id, req?.body);
    if (!products?.errors) res.send(products);
    else res.status(500).json(products);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      errors: [error?.message?.replaceAll("'")],
    });
  }
}

// delete product
export async function deleteProduct(req: any, res: any) {
  try {
    const products = await deleteProductByIdUtil(req?.params?.id);
    if (!products?.errors) res.send(products);
    else res.status(500).json(products);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      errors: [error?.message?.replaceAll("'")],
    });
  }
}
