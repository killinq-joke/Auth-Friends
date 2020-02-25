import React from "react";

export default function FriendsList({friend}) {
  return (
    <div key={friend.id}>
      <h3>
        {friend.name} <br />
        age: {friend.age} <br />
        email: {friend.email}
      </h3>
    </div>
  );
}
