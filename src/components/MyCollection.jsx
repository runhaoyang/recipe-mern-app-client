import { useState, useEffect } from "react";

const MyCollection = ({ userInfo }) => {
  return (
    <>
      <h1>Inside of my collections page</h1>
      <p>ID: {userInfo._id}</p>
      <p>Username: {userInfo.username}</p>
      <p>Password: {userInfo.password}</p>
    </>
  );
};

export default MyCollection;
