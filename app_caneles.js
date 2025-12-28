"use strict";

const express = require("express");
const app = express();
const port = 8080;

// ミドルウェア設定
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views/caneles");
app.use(express.static("public"));

// 仮データ
let caneles = [
    {
      id: 1,
      shop: "Canele de Chianti",
      area: "六本木",
      price: 375,
      flavor: "プレーン",
      crunch: 2,
      softness: 5,
      sweetness: "甘い",
      notes: "カヌレ特有の後味…ラム？卵っぽい風味",
      score: 5,
      comment: "生地感が強い。外側は少し硬いがカリッとはしていない。つやは完璧でラッカー仕上げのようだが、柔らかい。"
    },
    {
      id: 2,
      shop: "Canele de Chianti",
      area: "六本木",
      price: 375,
      flavor: "塩キャラメル",
      crunch: 2,
      softness: 4,
      sweetness: "とても甘い",
      notes: "焦がしキャラメル、海塩、焦げた砂糖の後味",
      score: 5,
      comment: "パンのような柔らかい食感。つやは美しい。"
    },
    {
      id: 3,
      shop: "Patisserie Sadaharu Aoki Paris Tokyo Midtown",
      area: "赤坂",
      price: 432,
      flavor: "カヌレ オ ショコラ",
      crunch: 8,
      softness: 6,
      sweetness: "ちょうどよい",
      notes: "チョコより卵感が強いカヌレ特有の後味",
      score: 9,
      comment: "皮が厚めで、中は生地とケーキの中間っぽい。見た目はほぼ完璧。外はマットでラッカー感がないのが唯一の欠点。"
    },
    {
      id: 4,
      shop: "Coco Ange",
      area: "六本木",
      price: 399,
      flavor: "キャラメルショコラオ・レ",
      crunch: 9,
      softness: 7,
      sweetness: "ほんのり甘い",
      notes: "フルーティーで深みのある味、キャラメル感は薄め",
      score: 8,
      comment: "チョコキャラメルがかかってる。つや完璧。"
    },
    {
      id: 5,
      shop: "Coco Ange",
      area: "六本木",
      price: 399,
      flavor: "クラシック",
      crunch: 9,
      softness: 5,
      sweetness: "控えめ",
      notes: "バニラと卵の風味",
      score: 6,
      comment: "少しオイリー。外は硬めで完璧なラッカー仕上げ。中に気泡がない部分も。"
    },
    {
      id: 6,
      shop: "Maison Landemaine 麻布台",
      area: "麻布台",
      price: 270,
      flavor: "塩キャラメル",
      crunch: 5,
      softness: 9,
      sweetness: "甘い",
      notes: "",
      score: 8,
      comment: "中はプリンみたい。小さくて安い。完璧なラッカー感あり。"
    },
    {
      id: 7,
      shop: "Maison Landemaine 麻布台",
      area: "麻布台",
      price: 220,
      flavor: "カフェ エスプレッソ",
      crunch: 3,
      softness: 9,
      sweetness: "甘いけどちょっと強い",
      notes: "コーヒー風味",
      score: 5,
      comment: "中はプリンみたい。小さくて安い。完璧なラッカー感あり。"
    },
    {
      id: 8,
      shop: "Le Bihan シャポー船橋店",
      area: "船橋",
      price: 346,
      flavor: "プレーン",
      crunch: 9,
      softness: 8,
      sweetness: "ほんのり甘い",
      notes: "少し卵っぽくてクッキーっぽい？",
      score: 9,
      comment: "よく焼けた茶色、マットな仕上がり。中はプリンのような食感。"
    },
    {
      id: 9,
      shop: "La maison JOUVAUD 虎ノ門ビルズ店",
      area: "愛宕",
      price: 411,
      flavor: "プレーン",
      crunch: 6,
      softness: 8,
      sweetness: "控えめ",
      notes: "ほろ苦い砂糖の風味",
      score: 6,
      comment: "皮が薄くて非常に切りにくい。卵のようなテクスチャー。"
    },
    {
      id: 10,
      shop: "La maison JOUVAUD 虎ノ門ビルズ店",
      area: "愛宕",
      price: 432,
      flavor: "カヌレショコラ コアントロー",
      crunch: 7,
      softness: 5,
      sweetness: "普通？",
      notes: "オレンジ風味",
      score: 4,
      comment: "切りやすい。カスタードっぽい。"
    },
    {
      id: 11,
      shop: "フロプレステージュ津田沼イオン店",
      area: "津田沼",
      price: 280,
      flavor: "プレーンプリン",
      crunch: 4,
      softness: 7,
      sweetness: "とても甘い",
      notes: "焦がしキャラメル",
      score: 5,
      comment: "この価格でこの味はかなり優秀。すごく美味しい。"
    }
  ];
  

// 一覧表示
app.get("/caneles", (req, res) => {
  res.render("index", { caneles });
});

// 先に固定の new ページ！
app.get("/caneles/new", (req, res) => {
    res.render("new");
  });
  
  // そのあとに :id の詳細ページ！
  app.get("/caneles/:id", (req, res) => {
    const id = Number(req.params.id);
    const canele = caneles.find(c => c.id === id);
    res.render("detail", { canele });
  });
  
// 新規追加処理
app.post("/caneles", (req, res) => {
  const newId = caneles.length > 0 ? caneles.at(-1).id + 1 : 1;
  const newCanele = {
    id: newId,
    shop: req.body.shop,
    area: req.body.area,
    price: Number(req.body.price),
    flavor: req.body.flavor,
    crunch: Number(req.body.crunch),
    softness: Number(req.body.softness),
    sweetness: req.body.sweetness,
    notes: req.body.notes,
    score: Number(req.body.score),
    comment: req.body.comment
  };
  caneles.push(newCanele);
  res.redirect("/caneles");
});

// 編集フォーム表示
app.get("/caneles/:id/edit", (req, res) => {
  const id = Number(req.params.id);
  const canele = caneles.find(c => c.id === id);
  res.render("edit", { canele });
});

// 編集処理
app.post("/caneles/:id/update", (req, res) => {
  const id = Number(req.params.id);
  const index = caneles.findIndex(c => c.id === id);
  if (index !== -1) {
    caneles[index] = {
      id,
      shop: req.body.shop,
      area: req.body.area,
      price: Number(req.body.price),
      flavor: req.body.flavor,
      crunch: Number(req.body.crunch),
      softness: Number(req.body.softness),
      sweetness: req.body.sweetness,
      notes: req.body.notes,
      score: Number(req.body.score),
      comment: req.body.comment
    };
  }
  res.redirect("/caneles");
});

// 削除処理
app.post("/caneles/:id/delete", (req, res) => {
  const id = Number(req.params.id);
  caneles = caneles.filter(c => c.id !== id);
  res.redirect("/caneles");
});

app.listen(port, () => {
  console.log(`Canele app listening at http://localhost:${port}/caneles`);
});
