// Per-status colors — data-driven, not theme tokens — stays in JS
export const STATUS_CFG = {
    Applied: {
        color: "#B45309",
        bg: "#FEF3C7",
        darkBg: "#292011",
        darkColor: "#FCD34D",
        emoji: "📬",
        msg: "Sent with love ✨",
    },
    Screening: {
        color: "#7C3AED",
        bg: "#EDE9FE",
        darkBg: "#1E1330",
        darkColor: "#C4B5FD",
        emoji: "🔍",
        msg: "They're curious!",
    },
    Interview: {
        color: "#D97706",
        bg: "#FFFBEB",
        darkBg: "#1F1500",
        darkColor: "#FDE68A",
        emoji: "🎤",
        msg: "Shine bright ⭐",
    },
    Offer: {
        color: "#059669",
        bg: "#D1FAE5",
        darkBg: "#052E1A",
        darkColor: "#6EE7B7",
        emoji: "🎉",
        msg: "Celebrate!! 🥳",
    },
    Rejected: {
        color: "#6B7280",
        bg: "#F3F4F6",
        darkBg: "#1C1C1C",
        darkColor: "#9CA3AF",
        emoji: "🌱",
        msg: "Next one's yours",
    },
};