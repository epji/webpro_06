"use strict";

const express = require("express");
const router = express.Router();

/* =========================
   DATA
   ========================= */
let games = [
  {
    id: 1,
    title: "Detroit: Become Human",
    platform: "PS4",
    genre: "アクションアドベンチャー",
    played: true,
    rating: 4,
    notes: "物語重視の作品で、プレイヤーの選択が展開に大きく影響する。分岐するストーリーによりリプレイ性が高い。",
    image: "https://i.imgur.com/fe1oo8J.jpeg"
  },
  {
    id: 2,
    title: "悪魔城ドラキュラX 月下の夜想曲",
    platform: "PlayStation（PS1）",
    genre: "アクションRPG",
    played: false,
    rating: 2,
    notes: "ストーリーや雰囲気は高く評価されているが、チュートリアルが少なく、レトロゲーム特有の高難易度は現代のプレイヤーには難しく感じられる場合がある。",
    image: "https://i.imgur.com/TSeEIKy.jpeg"
  },
  {
    id: 3,
    title: "ファイアーエムブレム 覚醒",
    platform: "Nintendo 3DS",
    genre: "シミュレーションRPG",
    played: true,
    rating: 4,
    notes: "戦略性の高いゲームプレイとキャラクター中心の物語がうまく融合している。シリーズ入門としても遊びやすい作品。",
    image: "https://i.imgur.com/df7H9N4.jpeg"
  },
  {
    id: 4,
    title: "Baldur’s Gate 3",
    platform: "PC",
    genre: "CRPG（コンピュータRPG）",
    played: true,
    rating: 5,
    notes: "プレイヤーの自由度と物語の分岐が非常に多く、システムも奥深い。高いリプレイ性があり、価格に見合う価値がある。",
    image: "https://i.imgur.com/Q1vifrF.jpeg"
  },
  {
    id: 5,
    title: "Mouthwashing",
    platform: "PC",
    genre: "アドベンチャー／サイコロジカルホラー",
    played: true,
    rating: 3,
    notes: "PS1風のレトロなビジュアルを用いて、不安感のある雰囲気を強調している。物語主導のホラー作品。",
    image: "https://i.imgur.com/a1ZFnkC.jpeg"
  },
  {
    id: 6,
    title: "Sally Face",
    platform: "PC",
    genre: "アドベンチャー／サイコロジカルホラー",
    played: true,
    rating: 2,
    notes: "独特なアートスタイルとダークなテーマが特徴。物語重視だが、ゲームプレイの奥深さは控えめ。",
    image: "https://i.imgur.com/OVJo4wi.jpeg"
  },
  {
    id: 7,
    title: "The Evil Within",
    platform: "PS4",
    genre: "サバイバルホラー／アクションアドベンチャー",
    played: true,
    rating: 1,
    notes: "ストーリーやホラー演出は魅力的だが、難易度の急激な上昇がプレイヤー体験に影響する可能性がある。",
    image: "https://i.imgur.com/2xT4fwK.jpeg"
  },
  {
    id: 8,
    title: "逆転裁判 (Phoenix Wright: Ace Attorney)",
    platform: "Nintendo 3DS",
    genre: "ビジュアルノベル／法廷アドベンチャー",
    played: true,
    rating: 4,
    notes: "個性的なキャラクターと法廷での駆け引きが非常に面白い。裁判中に盛り上がる音楽が緊張感を高めてくれる。",
    image: "https://i.imgur.com/d6HDVNA.jpeg"
  }
];

/* =========================
   ROUTES
   ========================= */

// 一覧
router.get("/", (req, res) => {
  res.render("games/index", { games });
});

// 新規追加フォーム
router.get("/new", (req, res) => {
  res.render("games/new");
});

// 編集フォーム（※ :id より上）
router.get("/:id/edit", (req, res) => {
  const game = games.find(g => g.id === parseInt(req.params.id));
  if (!game) return res.status(404).send("ゲームが見つかりません。");
  res.render("games/edit", { game });
});

// 詳細表示（※ 一番下）
router.get("/:id", (req, res) => {
  const game = games.find(g => g.id === parseInt(req.params.id));
  if (!game) return res.status(404).send("ゲームが見つかりません。");
  res.render("games/detail", { game });
});

// 新規追加 POST
router.post("/", (req, res) => {
  const newId = games.length ? Math.max(...games.map(g => g.id)) + 1 : 1;

  const newGame = {
    id: newId,
    title: req.body.title,
    platform: req.body.platform,
    genre: req.body.genre,
    played: req.body.played === "true",
    rating: req.body.rating ? parseInt(req.body.rating) : null,
    notes: req.body.notes,
    image: req.body.image || ""
  };

  games.push(newGame);
  res.redirect("/games");
});

// 編集更新 POST
router.post("/:id/update", (req, res) => {
  const game = games.find(g => g.id === parseInt(req.params.id));
  if (!game) return res.status(404).send("ゲームが見つかりません。");

  game.title = req.body.title;
  game.platform = req.body.platform;
  game.genre = req.body.genre;
  game.played = req.body.played === "true";
  game.rating = req.body.rating ? parseInt(req.body.rating) : null;
  game.notes = req.body.notes;
  game.image = req.body.image || "";

  res.redirect("/games");
});

// 削除 POST
router.post("/:id/delete", (req, res) => {
  const id = parseInt(req.params.id);
  games = games.filter(g => g.id !== id);
  res.redirect("/games");
});

module.exports = router;
