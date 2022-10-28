

const path = require('path')
const {
  createGoods, getGoodsInfoById, updateGoods, removeGoods, restoreGoods,
  findGoods
} = require('../service/goods.service')
const {
  createGoodsError, fileUploadError, goodsNotExist, getGoodsInfoError, updateGoodsInfoError,
  removeGoodsError, marktableTrueError, marktableFalseError, findGoodsListError
} = require('../constant/er.type')

class GoodsController {
  async create(ctx, next) {
    try {
      const { goods_name, goods_price, goods_num, goods_img } = ctx.request.body
      const res = await createGoods({ goods_name, goods_price, goods_num, goods_img })
      if (res) {
        const { updatedAt, createdAt, ...resInfo } = res;
        ctx.body = {
          code: 1,
          message: '创建商品成功',
          results: [{
            data: resInfo
          }]
        }
      } else {
        ctx.app.emit('error', createGoodsError, ctx);
      }
    } catch (err) {
      ctx.app.emit('error', createGoodsError, ctx);
    }
  }

  async getGoodsInfo(ctx, next) {
    try {
      const { id } = ctx.request.query;
      const res = await getGoodsInfoById({ id })
      if (res) {
        ctx.body = {
          code: 1,
          message: '获取商品信息成功',
          results: [res]
        }
      } else {
        ctx.app.emit('error', goodsNotExist, ctx);
      }
    } catch (err) {
      ctx.app.emit('error', getGoodsInfoError, ctx);
    }
  }

  async findGoodsList(ctx, next) {
    try {
      const { pageNum, pageSize } = ctx.request.query;
      const res = await findGoods(pageNum, pageSize)
      if (res) {
        ctx.body = {
          code: 1,
          message: '获取商品列表成功',
          results: [res]
        }
      } else {
        ctx.app.emit('error', findGoodsListError, ctx);
      }
    } catch (err) {
      ctx.app.emit('error', findGoodsListError, ctx);
    }
  }

  async update(ctx, next) {
    try {
      const id = ctx.params.id
      const { goods_name, goods_price, goods_num, goods_img } = ctx.request.body
      const res = await updateGoods({ id, goods_name, goods_price, goods_num, goods_img })
      if (res) {
        ctx.body = {
          code: 1,
          message: '更新商品信息成功',
          results: []
        }
      } else {
        ctx.app.emit('error', updateGoodsInfoError, ctx);
      }
    } catch (err) {
      ctx.app.emit('error', updateGoodsInfoError, ctx);
    }
  }

  //强制删除
  async remove(ctx, next) {
    try {
      const id = ctx.params.id
      const res = await removeGoods({ id, force: true })
      if (res) {
        ctx.body = {
          code: 1,
          message: '删除商品成功',
          results: []
        }
      } else {
        ctx.app.emit('error', removeGoodsError, ctx);
      }
    } catch (err) {
      ctx.app.emit('error', removeGoodsError, ctx);
    }
  }

  //修改上下架状态
  async changeMarktable(ctx, next) {
    const { id, marktable } = ctx.request.body
    const errInfo = marktable ? marktableTrueError : marktableFalseError
    //判断上下架状态与所执行操作是否冲突
    try {
      const res = await getGoodsInfoById({ id })
      if (res && (res.deletedAt && !marktable || !res.deletedAt && marktable) || !res) {//本身已下架，又要下架 或 本身已上架，又要上架
        return ctx.app.emit('error', errInfo, ctx);
      }
    } catch (err) {
      return ctx.app.emit('error', errInfo, ctx);
    }

    try {
      const res = marktable ? await restoreGoods({ id }) : await removeGoods({ id, force: false })
      if (res) {
        ctx.body = {
          code: 1,
          message: marktable ? '上架商品成功' : '下架商品成功',
          results: []
        }
      } else {
        ctx.app.emit('error', errInfo, ctx);
      }
    } catch (err) {
      ctx.app.emit('error', errInfo, ctx);
    }
  }

  async upload(ctx, next) {
    try {
      let { file } = ctx.request.files;
      if (file) {
        ctx.body = {
          code: 1,
          message: '图片上传成功',
          results: [{
            goods_img: path.basename(file.filepath)
          }]
        }
      } else {
        ctx.app.emit('error', fileUploadError, ctx);
      }
    } catch (err) {
      ctx.app.emit('error', fileUploadError, ctx);
    }
  }
}

module.exports = new GoodsController();