"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";

export default function FollowButton() {
  const [following, setFollowing] = useState(false);

  return (
    <button
      onClick={() => setFollowing(!following)}
      className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-full font-semibold transition
        ${
          following
            ? "bg-blue-100 text-blue-700"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }
      `}
    >
      {!following && <FiPlus className="text-lg" />}
      {following ? "Following" : "Follow"}
    </button>
  );
}
