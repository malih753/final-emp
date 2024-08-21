import React, { useEffect, useState } from "react";
import Button from "../../Button";
import like from "../../../assets/anonymous/like.png";
import comment from "../../../assets/anonymous/comment.png";
import report from "../../../assets/anonymous/report.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FeedCardWrap } from "./FeedCard.styles";
import { anonymousData } from "../../Constant/Data";
import { serverDomain } from "../../../Constants/serverDomain";
import { useAuth } from "../../Context/Context";

const FeedCard = ({ searchQuery }) => {
  const { companyId, user } = useAuth();
  console.log("user", user);

  const [forums, setForums] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // Initializing state for comments
  const [showCommentInputs, setShowCommentInputs] = useState(
    new Array(forums.length).fill(false)
  );
  const [commentValues, setCommentValues] = useState(
    new Array(forums.length).fill("")
  );

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLike = async (id, index) => {
    try {
      const res = await fetch(`${serverDomain}/forum/${id}/toggleLike`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user,
        }),
      });

      console.log("like response:", res);

      // Toggle like status and update like count
      setForums((prevForums) =>
        prevForums.map((forum, i) =>
          i === index
            ? {
                ...forum,
                userLiked: !forum.userLiked,
                likeCount: forum.userLiked
                  ? forum.likeCount - 1
                  : forum.likeCount + 1,
              }
            : forum
        )
      );
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleComment = (index) => {
    setShowCommentInputs((prevInputs) =>
      prevInputs.map((input, i) => (i === index ? true : input))
    );
  };

  const handleCommentInputChange = (event, index) => {
    const { value } = event.target;
    setCommentValues((prevValues) =>
      prevValues.map((commentValue, i) => (i === index ? value : commentValue))
    );
  };

  const handleCommentSubmit = async (id, index) => {
    console.log("Comment:", commentValues[index]);
    setShowCommentInputs((prevInputs) =>
      prevInputs.map((input, i) => (i === index ? false : input))
    );
    setCommentValues((prevValues) =>
      prevValues.map((commentValue, i) => (i === index ? "" : commentValue))
    );

    const body = JSON.stringify({
      comment: commentValues[index],
      userId: user,
    });
    try {
      const res = await fetch(`${serverDomain}/forum/${id}/comment`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      console.log("comment response:", res);
      setCommentValues("");
      setShowCommentInputs(false);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  console.log("Forums", forums);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${serverDomain}/forum/anonymouslyPost.fetch/${companyId}`
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        setForums(data.forums);
        setShowCommentInputs(new Array(data.forums.length).fill(false));
        setCommentValues(new Array(data.forums.length).fill(""));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [refresh]);

  const filteredForums = forums?.filter((item) => {
    if (item.title) {
      return item.title.toLowerCase().includes(searchQuery.toLowerCase());
    } else {
      return item;
    }
  });

  return (
    <FeedCardWrap>
      {filteredForums?.map((value, index) => (
        <div className="post" key={index}>
          <div className="blogHeader">
            <div className="logo">
              <img src={anonymousData[0].imag} alt="blog" />
              <div className="titleHolder">
                <h5>{value.title || "Title"}</h5>
                <div className="tags">
                  <span>{value.tags}</span>
                </div>
              </div>
            </div>
            <div className="icon">
              <BsThreeDotsVertical />
            </div>
          </div>
          <div className="para">
            <p>
              {value.moreDetails && value.moreDetails != null ? (
                <>
                  {isExpanded || value.moreDetails.length < 50
                    ? value.moreDetails
                    : `${value.moreDetails.substring(0, 200)}...`}
                  <span
                    onClick={handleToggle}
                    style={{ color: "blue", cursor: "pointer" }}
                  >
                    {value.moreDetails.length > 50
                      ? isExpanded
                        ? " see less"
                        : " see more"
                      : ""}
                  </span>
                </>
              ) : (
                "Details"
              )}
            </p>
          </div>
          <div className="flex">
            <div className="replyWrap">
              <button
                className="reply"
                onClick={() => handleLike(value.id, index)}
              >
                <img
                  src={like}
                  alt={value.userLiked ? "unlike" : "like"}
                />
                {value.userLiked ? "Unlike" : "Like"}
              </button>
              <button className="reply" onClick={() => handleComment(index)}>
                <img src={comment} alt="comment" />
                Comment
              </button>
              <button className="reply">
                <img src={report} alt="report" />
                Report
              </button>
            </div>
            <div className="counts">
              <span>
                {value.likeCount}{" "}
                {value.likeCount === 1 ? "like" : "likes"} |{" "}
                {value.reportCount} reports
              </span>
            </div>
          </div>
          {showCommentInputs[index] && (
            <div className="commentInput">
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentValues[index]}
                onChange={(event) => handleCommentInputChange(event, index)}
              />
              <button onClick={() => handleCommentSubmit(value.id, index)}>
                Comment
              </button>
              <br />
              <span>{commentValues[index]}</span>
            </div>
          )}
        </div>
      ))}
    </FeedCardWrap>
  );
};

export default FeedCard;
