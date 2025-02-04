import React from "react";

const commentsData = [
  {
    name: "comments",
    comment: "Hello, this is a sample comment.",
    replies: [
      {
        name: "user2",
        comment: "I also agree with user1!",
        replies: [
          {
            name: "user3",
            comment: "Absolutely!",
          },
        ],
      },
    ],
  },
  {
    name: "user1",
    comment: "This is a great comment!",
    replies: [
      {
        name: "user2",
        comment: "I also agree with user1!",
      },
    ],
  },
  {
    name: "user2",
    comment: "I agree with user1!",
    replies: [], // Ensure replies is always an array
  },
];

const Comment = ({ data }) => {
  const { name, comment } = data;
  return (
    <div className="flex shadow-sm bg-greyp-2 rounded-lg my-2">
      <img
        className="w-12 h-12"
        alt="user"
        src="https://i1.wp.com/cdn.auth0.com/avatars/na.png?ssl=1"
      />
      <div className="px-3">
        <p className="font-bold">{name}</p>
        <p className="">{comment}</p>
      </div>
    </div>
  );
};

const CommentList = ({ comments = [] }) => {
  console.log("Comments:", comments); // Debugging
  return (
    <>
      {comments.map((comment, index) => (
        <div key={index}>
          <Comment data={comment} />
          {comment.replies && comment.replies.length > 0 && (
            <div className="pl-5 border border-l-black">
              <CommentList comments={comment.replies} />
            </div>
          )}
        </div>
      ))}
    </>
  );
};

const CommentsContainer = () => {
  return (
    <div className="m-5 p-2">
      <h1 className="text-2xl font-bold">Comments:</h1>
      <CommentList comments={commentsData} />
    </div>
  );
};

export default CommentsContainer;
