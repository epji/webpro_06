"use strict";

const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

let fashion = [
  {
    id: 1,
    item: "レースフリル コルセット風ロングスリーブアウター／カーディガン",
    brand: "Poizen Industries",
    platform: "Grapefruit Moon（ヴィンテージショップ）",
    condition: "Used - Good",
    price: 10800,
    rating: 4,
    comment: "レースや編み上げディテールが印象的なゴシック調トップス。ウエストが程よくシェイプされており、着用時のシルエットがとても美しい。2000年代の人気ブランドらしいデザインで、スタイリングの主役になる一着。",
    image: "https://i.imgur.com/mQOQ2fm.jpeg"
  },
  {
    id: 2,
    item: "チェーン付き 変形ゴシックミニスカート",
    brand: "REACH produced by KEYSTATION",
    platform: "REBIRTH（下北沢 古着店）",
    condition: "Used - Like New",
    price: 22000,
    rating: 5,
    comment: "編み上げディテールやチェーン、十字架モチーフが印象的なゴシックテイストの変形スカート。アシンメトリーな裾とレース使いが存在感を放ち、試着した瞬間に惹かれた一着。",
    image: "https://i.imgur.com/S731RsL.jpeg"
  },
  {
    id: 3,
    item: "厚底 レザープラットフォームブーツ（ベルクロ仕様）",
    brand: "Swear London",
    platform: "Instagram（海外ディーラー）",
    condition: "Used - Fair",
    price: 55230,
    rating: 4,
    comment: "重厚感のあるレザーと極厚ソールが特徴的なプラットフォームブーツ。80〜90年代製としては状態も良く、サイズが見つかりにくい中で入手できた希少な一足。",
    image: "https://i.imgur.com/1X33Mjw.jpeg"
  },
  {
    id: 4,
    item: "チェック切替 チェーン付きパンクミニスカート",
    brand: "Mad Punk",
    platform: "Mercari",
    condition: "Used - Fair",
    price: 8800,
    rating: 2,
    comment: "赤チェックとブラック生地を切り替えたパンクテイストのミニスカート。ジッパーに不具合はあるが修理可能で、全体の雰囲気やデザイン性は損なわれていない。",
    image: "https://i.imgur.com/IXLb7xw.jpeg"
  },
  {
    id: 5,
    item: "ストライプ柄 レースフリル キャミワンピース",
    brand: "H.Jelly",
    platform: "Wunderwelt",
    condition: "Used - Good",
    price: 11999,
    rating: 5,
    comment: "ピンストライプ生地にレースやフリルを重ねたゴシック調キャミワンピース。一部レースにダメージはあるが、デザインの可愛さと存在感が際立つ一着。",
    image: "https://i.imgur.com/tiViRvu.jpeg"
  },
  {
    id: 6,
    item: "ブルーレース切替 ノースリーブゴシックワンピース",
    brand: "Moi-même-Moitié",
    platform: "Closet Child",
    condition: "Used - Great",
    price: 14800,
    rating: 3,
    comment: "ブラック×ブルーの配色が印象的なゴシック調ワンピース。チュール素材のボリューム感とウエストリボンによるシルエットの美しさが特徴。",
    image: "https://i.imgur.com/JGYQ5pI.jpeg"
  },
  {
    id: 7,
    item: "メタルパーツ付き インダストリアル厚底ブーツ",
    brand: "New Rock",
    platform: "Mercari",
    condition: "Used - Great",
    price: 36460,
    rating: 5,
    comment: "重厚な厚底ソールとメタルパーツが特徴的なインダストリアル系ブーツ。足元に圧倒的な存在感を与える、憧れの一足。",
    image: "https://i.imgur.com/p6dQJx8.jpeg"
  },
  {
    id: 8,
    item: "ベルベット 五芒星刺繍 コルセット風トップス",
    brand: "Bares",
    platform: "REBIRTH（下北沢）",
    condition: "Used - Good",
    price: 7800,
    rating: 5,
    comment: "ベルベット素材に五芒星刺繍と編み上げディテールを施したゴシック調トップス。フレア袖とレース使いが印象的で、雰囲気作りに最適な一着。",
    image: "https://i.imgur.com/4o4dpwG.jpeg"
  },
  {
    id: 9,
    item: "編み上げ・チェーン付き 変形パンクラップスカート",
    brand: "MAD PUNKS",
    platform: "REBIRTH（下北沢）",
    condition: "New with Tags",
    price: 14000,
    rating: 4,
    comment: "編み上げとチェーンディテールが特徴的なラップタイプのパンクスカート。コーディネートに取り入れやすく、スタイリングの幅が広い。",
    image: "https://i.imgur.com/mAm8Pq5.jpeg"
  },
  {
    id: 10,
    item: "コルセット切替 ショートゴシックジャケット",
    brand: "TRIPP NYC",
    platform: "Mercari",
    condition: "Used - Good",
    price: 16900,
    rating: 3,
    comment: "ジャカード調の総柄生地とコルセット風のウエスト切替が特徴的なショートジャケット。羽織るだけでゴシックな雰囲気が完成する。",
    image: "https://i.imgur.com/wxlmP86.jpeg"
  },
  {
    id: 11,
    item: "チェーン・スタッズ付き インダストリアルワイドカーゴパンツ",
    brand: "TRIPP NYC",
    platform: "Bad Ame（原宿）",
    condition: "Used - Good",
    price: 28900,
    rating: 4,
    comment: "ワイドシルエットにチェーンやスタッズを組み合わせたインダストリアルテイストのカーゴパンツ。現在特に気に入っている一本。",
    image: "https://i.imgur.com/YOGZrUq.jpeg"
  }
];


// 一覧
app.get("/fashion", (req, res) => {
  res.render("fashion/index", { fashion });
});

// 新規追加フォーム（※ :id より上）
app.get("/fashion/new", (req, res) => {
  res.render("fashion/new");
});

// 編集フォーム（※ :id より上）
app.get("/fashion/:id/edit", (req, res) => {
  const id = Number(req.params.id);
  const item = fashion.find(f => f.id === id);
  if (!item) return res.status(404).send("アイテムが見つかりません。");
  res.render("fashion/edit", { item });
});

// 詳細（※最後）
app.get("/fashion/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = fashion.find(f => f.id === id);
  if (!item) return res.status(404).send("アイテムが見つかりません。");
  res.render("fashion/detail", { item });
});

// 追加（POST /fashion）
app.post("/fashion", (req, res) => {
  const newId = fashion.length ? Math.max(...fashion.map(f => f.id)) + 1 : 1;

  const newItem = {
    id: newId,
    item: req.body.item,
    brand: req.body.brand,
    platform: req.body.platform,
    condition: req.body.condition,
    price: Number(req.body.price),
    rating: req.body.rating ? Number(req.body.rating) : null,
    comment: req.body.comment,
    image: req.body.image || ""
  };

  fashion.push(newItem);
  res.redirect("/fashion");
});

// 更新（POST /fashion/:id/update）
app.post("/fashion/:id/update", (req, res) => {
  const id = Number(req.params.id);
  const index = fashion.findIndex(f => f.id === id);
  if (index === -1) return res.status(404).send("アイテムが見つかりません。");

  fashion[index] = {
    id,
    item: req.body.item,
    brand: req.body.brand,
    platform: req.body.platform,
    condition: req.body.condition,
    price: Number(req.body.price),
    rating: req.body.rating ? Number(req.body.rating) : null,
    comment: req.body.comment,
    image: req.body.image || ""
  };

  res.redirect("/fashion");
});

// 削除（POST /fashion/:id/delete）
app.post("/fashion/:id/delete", (req, res) => {
  const id = Number(req.params.id);
  fashion = fashion.filter(f => f.id !== id);
  res.redirect("/fashion");
});

app.listen(PORT, () => {
  console.log(`Fashion app running on http://localhost:${PORT}/fashion`);
});
