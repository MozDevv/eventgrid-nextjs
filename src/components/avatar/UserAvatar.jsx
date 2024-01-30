import React from "react";
import Avatar from "react-avatar";

function UserAvatar({ firstName, lastname }) {
  const initials = `${firstName.charAt(0)}${lastname.charAt(0)}`;

  return (
    <div>
      <Avatar size={50} round={50} name={initials} />
    </div>
  );
}

export default UserAvatar;
