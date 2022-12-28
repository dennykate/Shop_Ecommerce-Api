import Products from "../models/products.js";

export const createProduct = async (req, res) => {
  const {
    images,
    title,
    description,
    price,
    style,
    material,
    type,
    customized,
  } = req.body;

  if (!images || !title || !description || !price) {
    return res.status(400).json({
      message: "required all data",
    });
  }

  const id = new Date().getTime();

  const newProduct = new Products({
    id,
    images,
    title,
    description,
    price,
    style,
    material,
    type,
    customized,
  });

  try {
    await newProduct.save();

    return res.status(201).json({
      meta: {
        id,
      },
      data: newProduct,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const getProducts = async (req, res) => {
  const options = req.query;

  const filter = options.filter || {};
  const page = parseInt(options.page) || 1;
  const sort = options.sort || { id: -1 };
  const limit = 8;
  const skip = (page - 1) * limit;

  for (let i in sort) {
    sort[i] = parseInt(sort[i]);
  }

  try {
    const products = await Products.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);
    const totalProducts = await Products.find();

    return res.status(200).json({
      meta: {
        total: totalProducts.length,
        skip,
        page,
        filter,
        sort,
      },
      data: products,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const getProductById = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      message: "Missing Id",
    });
  }

  try {
    const product = await Products.find({
      id,
    });

    if (product.length == 0) return res.sendStatus(404);

    return res.status(200).json({
      data: product,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const updateProduct = async (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).json({ message: "missing id" });

  try {
    const updated = await Products.findOneAndUpdate({ id }, req.body, {
      new: false,
    });

    if (!updated) return res.sendStatus(404);

    return res.status(201).json({
      message: "updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).json({ message: "missing id" });

  try {
    await Products.findOneAndDelete({ id });

    return res.status(201).json({
      message: "deleted successfully",
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};
