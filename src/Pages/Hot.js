import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "../Styles/hot.css";
import "../Styles/paginate.css";

import Modal from "../Components/Modal";
import VipPreview from "../Components/VipPreview";
import VipVideos from "../Components/VipVideos";

import vipIcon from "../Assets/images/vipIconVideo.png";
import bestIcon from "../Assets/images/bestIconVideo.png";

const videosPerPage = 16;
function Hot({ account, isVip, setFocus, vipVideos }) {
  // videos list
  const [currentVideos, setCurrentVideos] = useState(null);

  const [pageCount, setPageCount] = useState(0);
  const [videoOffset, setVideoOffset] = useState(0);
  const [isCloseModal, setCloseModal] = useState(false);

  const [videoType, setVideoType] = useState("vip");

  const urlParams = new URL(window.location.href);
  const pathname = urlParams.pathname;

  // vip 視頻數據庫

  useEffect(() => {
    setFocus("/hot");
    const endOffset = videoOffset + videosPerPage;
    setCurrentVideos(vipVideos.slice(videoOffset, endOffset));
    setPageCount(Math.ceil(vipVideos.length / videosPerPage));
  }, [account, setFocus, videoOffset, vipVideos]);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * videosPerPage) % vipVideos.length;
    setVideoOffset(newOffset);
  };

  const toggleBest = () => {
    alert("資源整合中...");
    return;
    // setVideoType("audio");
  };
  const toggleVip = () => {
    setVideoType("vip");
  };

  return (
    <>
      <div className="hot">
        <p>videos</p>
        <h3>性 - 感 - 熱 - 舞 - 區</h3>
        <p>會員視頻</p>
        <>
          <div className="toggle-type">
            <img
              onClick={toggleBest}
              className={videoType === "best" ? "type-focus" : "type-video-img"}
              src={bestIcon}
              alt=""
            />
            <img
              onClick={toggleVip}
              className={videoType === "vip" ? "type-focus" : "type-video-img"}
              src={vipIcon}
              alt=""
            />
          </div>
          {isVip === true ? (
            <div className="hotVideo-box">
              {currentVideos &&
                currentVideos.map((video, index) => {
                  return (
                    <div className="item" key={index}>
                      <VipVideos
                        orgUrl={pathname}
                        isVip={isVip}
                        key={video.__id__}
                        id={video.__id__}
                        bj={video.name}
                        img={video.img}
                        info={video.info}
                      />
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="hotVideo-box">
              {currentVideos &&
                currentVideos.map((video, index) => {
                  return (
                    <div className="item" key={index}>
                      <VipPreview
                        key={index}
                        bj={video.name}
                        img={video.img}
                        info={video.info}
                      />
                    </div>
                  );
                })}
            </div>
          )}
        </>
        {!isCloseModal && !isVip && <Modal closeModal={setCloseModal} />}
      </div>
      <div className="pagination-container">
        <ReactPaginate
          breakLabel="."
          nextLabel=">"
          onPageChange={handlePageClick}
          // pageRangeDisplayed={2}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="active-page"
        />
      </div>
    </>
  );
}

export default Hot;
