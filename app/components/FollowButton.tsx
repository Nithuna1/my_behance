"use client";

import { FiPlus } from "react-icons/fi";

type FollowButtonProps = {
  following: boolean;
  onToggle: () => void;
};

export default function FollowButton({
  following,
  onToggle,
}: FollowButtonProps) {
  return (
    <button
      onClick={onToggle}
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
