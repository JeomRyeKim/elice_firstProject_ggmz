import { ProductSchema } from "../db/schemas/product-schema";

function validateProductListRequest(req, res, next) {
  const { category, page, perPage } = req.query;
  if (category) {
    const allowedCategories = ProductSchema.path("category").enumValues;
    if (!allowedCategories.includes(category)) {
      throw new Error("존재하지 않는 카테고리 입니다.");
    }
  }
  if ((page, perPage)) {
    if (isNaN(parseInt(page)) || isNaN(parseInt(perPage))) {
      throw new Error("페이지 및 페이지 크기는 숫자 여야 합니다.");
    }
  }
  next();
}

module.exports = { validateProductListRequest };
