import Cart from "../models/cart.js";

export const createCart = async (req, res) => {
  const { id, time, userData, carts, totalAmount, orderedBy, note } = req.body;

  try {
    const newCart = new Cart({
      id,
      time,
      userData,
      carts,
      totalAmount,
      orderedBy,
      note,
      status: "pending",
    });

    await newCart.save();

    return res.status(201).json({
      message: "Checkout Success",
      data: newCart,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Checkout Fail",
    });
  }
};

export const getCarts = async (req, res) => {
  const id = req.params.id;
  const options = req.query;

  const filter = options.filter || {};
  const sort = options.sort || { _id: -1 };
  const page = parseInt(options.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  for (let i in sort) {
    sort[i] = parseInt(sort[i]);
  }

  try {
    const carts = await Cart.find({ orderedBy: id, ...filter })
      .sort(sort)
      .skip(skip)
      .limit(limit);

    if (carts.length == 0) {
      return res.status(200).json({
        message: "Empty Cart",
      });
    }

    const totalCarts = await Cart.find({ orderedBy: id });

    return res.status(200).json({
      meta: {
        total: totalCarts.length,
        filter,
        sort,
        page,
        limit,
      },
      data: carts,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const getCartDetail = async (req, res) => {
  const id = req.params.id;

  try {
    const cart = await Cart.findOne({ id });

    if (!cart) return res.sendStatus(404);

    return res.status(200).json({ data: cart });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const updateStatus = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  if (!status) return res.status(400).json({ message: "missing status" });

  try {
    await Cart.findOneAndUpdate({ _id: id }, { status }, { new: false });

    return res.status(201).json({
      message: "updated successfully",
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};
