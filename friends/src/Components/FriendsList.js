import React from "react";
import FriendCard from "./FriendCard";

export default function FriendsList({ friends, deleteFriend }) {
  return (
    <div>
      {friends.map(friend => {
        return (
          <FriendCard
            key={friend.id}
            friend={friend}
            deleteFriend={deleteFriend}
          />
        );
      })}
    </div>
  );
}
