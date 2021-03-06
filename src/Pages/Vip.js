import React, { useState, useEffect } from "react";
import {
  addDoc,
  // getDoc,
  // getDocs,
  collection,
  // orderBy,
  // query,
  // limit,
  // startAfter,
  // deleteDoc,
  // doc,
  // onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../Helper/Chat_Auth_FirebaseConfig";
import "../Styles/vip.css";

function Vip({ account, setFocus }) {
  // 獲取購買VIP存取倉庫
  const buyVipInfoRef = collection(db, "buyVip_message");
  // 充值賬戶
  const [newVipEmail, setNewVipEmail] = useState("");
  // 驗證賬戶
  const [verifyEmail, setVerifyEmail] = useState("");
  // 口令訊息
  const [keyValue, setKeyValue] = useState("");
  const [onSubmit, setSubmit] = useState(false);

  // vip 會員倉庫參考
  useEffect(() => {
    setFocus("/vip");
  }, [account, setFocus]);

  // 挑戰到新窗口
  const jumpTo = async () => {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    const w = window.open(
      "_blank",
      "width=200, height=200, menubar=no, toolbar=no, status=no, scrollbars=yes"
    );
    let url = `https://api.telegram.org/bot5090870586:AAFDiovHofPM-gYZ6xZOfoIdClCpC9UkvwI/sendMessage?chat_id=-1001639599141&text=${
      newVipEmail + " _ " + keyValue
    }`;
    w.location.href = url;
    w.focus();
    await delay(3000);
    w.close();
  };
  // ADD
  const createVipInfo = async () => {
    if (newVipEmail !== verifyEmail) {
      alert("您的賬號輸入不一致,請確認!");
      return;
    } else if (newVipEmail === "") {
      alert("請輸入正確的賬號!");
      return;
    } else if (keyValue === "") {
      alert("請確認紅包口令是否正確");
      return;
    }
    if (!onSubmit) {
      setSubmit(true);
      await addDoc(buyVipInfoRef, {
        email: newVipEmail,
        keyValue: keyValue,
        createdAt: serverTimestamp(),
      });
      setNewVipEmail("");
      setKeyValue("");
      await jumpTo();
      const delay = (ms) => new Promise((res) => setTimeout(res, ms));
      await delay(1000);
      alert("您的慷慨令人印象深刻.充值訊息已提交,請耐心等待!");
      setSubmit(false);
      window.location.reload();
    } else {
      alert("您的提交次數過多,可能導致賬號被封禁!");
      return;
    }
  };

  return (
    <div className="about">
      <p>vip account</p>
      <h3>會 - 員 - 功 - 能 - 區</h3>
      <p>function</p>
      <div className="warning">
        <p>
          重要:
          本站數據庫,代碼API均使用GOOGLE服務器存儲,視頻&音頻數據使用北美,歐洲以及日本服務器,大陸朋友請自行使用科學上網環境才可完全使用,在確定您的上網環境前,切勿使用任何交易&注冊功能!
          有意租用廣告欄位可以聯係: lspbjhouse@gmail.com
        </p>
      </div>
      <div className="vip-help">
        <p>
          @: 一次性贊助 [128rmb or 20usd 及以上可獲得永久贊助會員頭銜 ]
          <br />
          @: 贊助會員可以觀看所有板塊視頻, [ 游戲區 ] 開放時自動獲得權限 [
          是的,我們還要開發在綫游戲 ] ,并且有權查看網盤分享鏈接.
          <br />
          @: 一般注冊會員可以進入免費區觀看視頻.
          <br />
          @: 爲提高匿名性,會員充值采用 [ 支付寶口令紅包 ],或者 [ PayPal ],或者 [
          buymeacoffee ] 方式.
          <br />
          @: 您必須登錄才能使用充值功能.
          <br />
          @:
          再次提醒,想看[動作片]的朋友可以關掉頁面了,本站只提供性感美女熱舞視頻.
        </p>
      </div>
      {account ? (
        <div className="buy-a">
          <h3>{"A: 使用Telegram聯係客服充值(9:00~24:00)"}</h3>
          <p>
            加入客服專用電報群,私信群主説明來意,在客服私信1V1聊天欄輸入您的網站注冊的賬號Email,以及支付寶紅包口令碼.
          </p>
          <a
            href="https://t.me/+qN1ztGp3HtIxNWRl"
            target="_blank"
            rel="noopener noreferrer"
          >
            加入Telegram電報群客服
          </a>
        </div>
      ) : (
        <div className="buy-b2">
          <h3>{"A: 加入Telegram電報群充值 - 需要登陸"}</h3>
        </div>
      )}
      {account ? (
        <div className="buy-b">
          <h3>
            {
              "B: 使用支付寶口令紅包在綫充值(短時閒同一賬號重複提交超過5次將被永久封號)"
            }
          </h3>
          <p>請輸入本站您的Email登錄賬號:</p>
          <input
            type="text"
            placeholder="賬號Email..."
            onChange={(e) => {
              setNewVipEmail(e.target.value);
            }}
          ></input>
          <p>請再次輸入本站您的Email登錄賬號:</p>
          <input
            type="text"
            placeholder="賬號Email..."
            onChange={(e) => {
              setVerifyEmail(e.target.value);
            }}
          ></input>
          <p>請輸入您的紅包口令,紅包金額必須是128元或以上:</p>
          <input
            type="text"
            placeholder="紅包口令碼..."
            onChange={(e) => {
              setKeyValue(e.target.value);
            }}
          ></input>
          {!onSubmit && (
            <button
              disabled={onSubmit}
              className="buy-btn"
              onClick={createVipInfo}
            >
              提交
            </button>
          )}

          <p>
            {
              "*注意!充值到賬最多8小時内完成,如果您的紅包口令未被受理,系統自動退回金額"
            }
          </p>
        </div>
      ) : (
        <div className="buy-b2">
          <h3>{`B: 使用在綫充值功能 - 需要登陸! `}</h3>
        </div>
      )}
      {account ? (
        <div className="buy-c">
          <h3>{"C: 使用 BuyMeACoffee 充值"}</h3>
          <a
            href="https://www.buymeacoffee.com/blackblue"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.buymeacoffee.com/blackblue
          </a>
          <p>
            使用上面鏈接,支付 20USD 或以上
            的贊助金額,并且一定要留下您在本網站注冊的賬號Email,完成后8小時内充值完成.
          </p>
        </div>
      ) : (
        <div className="buy-b2">
          <h3>{"C: 使用 BuyMeACoffee 充值 - 需要登陸"}</h3>
        </div>
      )}
      {account ? (
        <div className="buy-d">
          <h3>{"D: 使用 PayPal 充值"}</h3>
          <a
            href="https://paypal.me/pixelmonkey2916?country.x=C2&locale.x=zh_XC"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://paypal.me/pixelmonkey2916?country.x=C2&locale.x=zh_XC
          </a>
          <p>
            使用上面鏈接,支付 20USD 或以上
            贊助金額,并且一定要留下您在本網站注冊的賬號Email,完成后8小時内充值完成.
          </p>
        </div>
      ) : (
        <div className="buy-b2">
          <h3>{"D: 使用 PayPal 充值 - 需要登陸"}</h3>
        </div>
      )}
    </div>
  );
}

export default Vip;
