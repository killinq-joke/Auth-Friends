import React from "react";

export default function FriendsList({friend, deleteFriend}) {
  return (
    <div>
      <h3>
        {friend.name} <br />
        age: {friend.age} <br />
        email: {friend.email}
      </h3>
      <button onClick={evt => deleteFriend(friend.id)}>delete</button>
    </div>
  );
}
