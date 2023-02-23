const ProductManager = require('../dao/mongoManager/BdProductManager');
const BdCartManager = require('../dao/mongoManager/BdCartManager');



const views = async (req, res) => {
  const page = req.query.page
  const products = await ProductManager.getProduct(page);
  const view = products.docs.map((products) => ({ title: products.title, description: products.description, price: products.price, stock: products.stock, thumbnail: products.thumbnail }));
  res.render('home', { products: view, hasPrevPage: products.hasPrevPage, hasNextPage: products.hasNextPage, page: products.page, totalPages: products.totalPages });
}


const viewCart = async (req, res) => {
  const { cid } = req.params
  const cart = await BdCartManager.renderCart(cid);
  const vista = cart.map((cart) => ({ priceTotal: cart.priceTotal, quantityTotal: cart.quantityTotal, products: cart.products }))
  res.render("cart", {
    products: vista,
  })
}

const register = async (req, res) => {
  res.render("register")
}

const login = async (req, res) => {
  res.render("login")
}

const profile = async (req, res) => {
  res.render('profile', {
    name: req.session.user.firstName,
    lastName: req.session.user.lastName,
    email: req.session.user.email,
  })
}

const logout = async (req, res) => {
  req.session.destroy();
  res.render('logout')
  // setTimeout(function(){
  //   window.location.href = 'http://localhost:8080/login';
  // },5000)
  // res.send("Session has been destroyed");
}

module.exports = {
  views,
  viewCart,
  register,
  login,
  profile,
  logout,
};
