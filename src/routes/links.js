const express = require("express");
const router = express.Router();
const Handlebars = require("handlebars");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './uploads');
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const pool = require("../database");
const { isLoggedIn } = require("../lib/auth");

router.get("/add", isLoggedIn, (req, res) => {
  res.render("links/add");
});

router.post("/add", isLoggedIn, upload.single("imagen"), async (req, res) => {
  const { Titulo, Description, categoria, precios } = req.body;
  
  if (!req.file) {
    res.status(400).send('No se cargó ninguna imagen');
    return;
  }
  
  const imagen = req.file.path;
  const newLink = {
    Titulo,
    imagen,
    Description,
    categoria,
    precios,
    user_id: req.user.id,
  };
  
  try {
    await pool.query("INSERT INTO links set ?", [newLink]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al guardar el producto');
    return;
  }
  
  req.flash("success", "Producto Guardado");
  res.redirect("/links");
});


router.get("/", isLoggedIn, async (req, res) => {
  const links = await pool.query("SELECT * FROM links WHERE user_id = ?", [
    req.user.id,
  ]);
  res.render("links/list", { links });
});

router.get("/delete/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM links WHERE ID = ?", [id]);
  req.flash("success", "producto Eliminado");
  res.redirect("/links");
});

router.get("/edit/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const links = await pool.query("SELECT * FROM links WHERE id = ?", [id]);
  console.log(links);
  res.render("links/edit", { link: links[0] });
});

router.post("/edit/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { Titulo, Description, imagen, categoria,precios } = req.body;
  const newLink = {
    Titulo,
    Description,
    imagen,
    categoria,
    precios
  };
  await pool.query("UPDATE links set ? WHERE id = ?", [newLink, id]);
  req.flash("success", "Producto Guardado");
  res.redirect("/links");
});

router.get("/desayunos", async (req, res) => {
  const links = await pool.query("SELECT * FROM links");
  res.render("links/desayunos", { links });
});

router.get("/floristeria", async (req, res) => {
  const links = await pool.query("SELECT * FROM links");
  res.render("links/floristeria", { links });
});

Handlebars.registerHelper("eq", function (a, b) {
  return a === b;
});

router.get('/imagen/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await pool.query('SELECT imagen FROM links WHERE id = ?', [id]);
    const imagen = rows[0].imagen;
    res.sendFile(path.resolve(imagen));
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al leer la imagen');
  }
});





module.exports = router;
