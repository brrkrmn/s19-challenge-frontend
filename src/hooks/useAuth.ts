import authService from "@/service/auth/auth";
import { LoginRequest, SignupRequest } from "@/service/auth/auth.types";
import { addToast } from "@heroui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useSignup = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["signup"],
    mutationFn: (data: SignupRequest) => {
      return authService.signup(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["signup"] });
      router.push("/dashboard");
      addToast({
        title: "Signup successful",
        color: "success",
      });
    },
    onError: (error) => {
      addToast({
        title: "Signup failed.",
        description: error.message,
        color: "danger",
      });
    }
  })
}

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginRequest) => {
      return authService.login(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] });
      router.push("/dashboard");
      addToast({
        title: "Login successful",
        color: "success",
      });
    },
    onError: (error) => {
      addToast({
        title: "Login failed",
        description: error.message,
        color: "danger",
      });
    }
  })
}