import React from "react";
import FriendCard from "./FriendCard";

export default function FriendsList({ friends }) {
  return (
    <div>
      {friends.map(friend => {
        return (
          <FriendCard friend={friend}/>
        );
      })}
    </div>
  );
}
