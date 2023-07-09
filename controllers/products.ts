const models = require("../libs/shared/src/sequelize/models");
const { products } = models;

// create product
export async function createProduct(req: any, res: any) {
  try {
    const { productName } = req?.body || {};
    if (productName) {
      const existing = await products.findOne({
        where: { productName, isArchived: null },
      });
      if (existing) {
        res
          .status(400)
          .json({ success: false, message: "Product Name should be unique" });
      } else {
        const registered = await products.create({ productName });
        res.send({
          success: true,
          message: "Product created successfuly",
          product: registered,
        });
      }
    } else {
      res
        .status(400)
        .json({ success: false, message: "Product name is missing" });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errors: [error?.message?.replaceAll("'")],
    });
  }
}

// get all product
export async function getAllProduct(req: any, res: any) {
  try {
    const { offset = 0, limit = 20 } = req?.query || {};
    const { count: totalProducts, rows } = await products.findAndCountAll({
      where: { isArchived: null },
      order: [["createdAt", "DESC"]],
      offset,
      limit,
    });
    res.send({
      success: true,
      message: "Products found",
      totalProducts,
      products: rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errors: [error?.message?.replaceAll("'")],
    });
  }
}

// get product by id
export async function getProduct(req: any, res: any) {
  try {
    const { id } = req.params;
    const prod = await products.findByPk(id);
    if (prod) {
      res.send({
        success: true,
        message: "Product found",
        product: prod,
      });
    } else {
      res.send({
        success: true,
        message: "Product not found",
        products: prod,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errors: [error?.message?.replaceAll("'")],
    });
  }
}

// update product
export async function updateProduct(req: any, res: any) {
  try {
    const { productName } = req?.body || {};
    const { id } = req.params;
    const [count, rows] = await products.update(
      { productName },
      { where: { id }, returning: true }
    );
    if (count > 0) {
      res.send({
        success: true,
        message: "Product updated successfuly",
        product: rows?.[0] || {},
      });
    } else {
      res.status(400).json({ success: false, message: "Product not found" });
    }
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Internal Server Error",
      errors: [error?.message?.replaceAll("'")],
    });
  }
}

// delete product
export async function deleteProduct(req: any, res: any) {
  try {
    const { id } = req.params;
    const [count, rows] = await products.update(
      { isArchived: new Date().toISOString() },
      { where: { id }, returning: true }
    );
    if (count > 0) {
      res.send({
        success: true,
        message: "Product updated successfuly",
        product: rows?.[0] || {},
      });
    } else {
      res.status(400).json({ success: false, message: "Product not found" });
    }
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Internal Server Error",
      errors: [error?.message?.replaceAll("'")],
    });
  }
}
