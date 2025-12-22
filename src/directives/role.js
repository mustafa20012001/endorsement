import { getUserRole } from "@/utils/auth";

export default {
  mounted(el, binding) {
    const userRole = Number(getUserRole()); // 🔥 مهم
    const allowed = binding.value || [];

    if (!allowed.includes(userRole)) {
      el.remove();
    }
  },
};
