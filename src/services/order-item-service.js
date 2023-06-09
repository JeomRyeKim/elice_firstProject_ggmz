import { orderItemModel } from "../db/models/order-item-model";
import { productService } from "./product-service";

class OrderItemService {
  constructor(orderItemModel) {
    this.orderItemModel = orderItemModel;
  }

  // Product stock에 구입한 개수만큼 -처리 해야함
  async addItem(items) {
    let orderItems = [];
    for (let i = 0; i < items.length; i++) {
      orderItems.push(items[i]);
    }

    const createNewOrderItem = await this.orderItemModel.create(orderItems);
    const productId = createNewOrderItem.map((val) => val.productId);
    const quantity = createNewOrderItem.map((val) => val.quantity);

    productService.decreaseProductsStock(items);
    return createNewOrderItem;
  }

  async getItemsByOrderId(orderId) {
    const orderItems = await this.orderItemModel.findAllByOrderId(orderId);
    return orderItems;
  }

  async getItemsByProductId(productId) {
    const orderItems = await this.orderItemModel.findAllByProductId(productId);
    return orderItems;
  }

  async getItems() {
    const orderItems = await this.orderItemModel.findAll();
    return orderItems;
  }

  async getItemData(orderItemId) {
    const orderItem = await this.orderItemModel.findById(orderItemId);
    if (!orderItem) {
      throw new Error(
        "해당 id의 주문 아이템이 없습니다. 다시 한 번 확인해 주세요."
      );
    }

    return orderItem;
  }

  // 주문 취소 관리
  // Product stock에 구입한 개수만큼 +처리 해야함
  async setItem(orderItemId, productId, toUpdate) {
    const updatedOrderItem = await this.orderItemModel.update({
      orderItemId,
      update: toUpdate,
    });
    productService.increaseProductStock(productId, toUpdate.quantity);
    return updatedOrderItem;
  }

  async getOrderItems(type, value) {
    const orderItems = await this.orderItemModel.findByType(type, value);
    if (!orderItems) {
      usersInfo =
        "없는 사용자 주문 아이템 정보 입니다. 다시 한 번 확인해 주세요.";
    }
    return orderItems;
  }

  async deleteOrderItem(orderItemId) {
    const deletedOrderItem = await this.orderItemModel.delete(orderItemId);
    if (!deletedOrderItem) {
      throw new Error(
        `${orderItemId} 주문 아이템의 삭제 처리에 실패하였습니다.`
      );
    }
    return deletedOrderItem;
  }
}

const orderItemService = new OrderItemService(orderItemModel);

export { orderItemService };
