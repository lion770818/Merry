var util = require('util');

var DEF_LS_ACCOUNT              = 'Account';				// 玩家帳號
var DEF_LS_PASSWORD             = 'Password';				// 玩家密碼

var DEF_LS_PLAYER               = 'PlayerInfo';				// 玩家資料
var DEF_LS_PLAYER_MONEY         = 'PlayerInfoMoney';		// 玩家金幣
var DEF_LS_MACHINE_NUM          = 'MachineNum';				// 玩家的機台資訊 (應該在 Lobby 點機台位子, 在設定, 先抓UID檔著先 )
var DEF_LS_BET_KIND_STR         = 'BetKindStr';             // 總押注表


exports.DEF_LS_ACCOUNT 			= DEF_LS_ACCOUNT;
exports.DEF_LS_PASSWORD 		= DEF_LS_PASSWORD;

exports.DEF_LS_PLAYER 			= DEF_LS_PLAYER;
exports.DEF_LS_PLAYER_MONEY 	= DEF_LS_PLAYER_MONEY;
exports.DEF_LS_MACHINE_NUM 		= DEF_LS_MACHINE_NUM;
exports.DEF_LS_BET_KIND_STR 	= DEF_LS_BET_KIND_STR;