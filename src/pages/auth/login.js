import { useCallback, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  // Alert,
  Box,
  Button,
  // FormHelperText,
  // Link,
  Stack,
  // Tab,
  // Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [method, setMethod] = useState("email");
  const formik = useFormik({
    initialValues: {
      email: "demo@devias.io",
      password: "Password123!",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await auth.signIn(values.email, values.password);
        router.push("/");
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  // const handleMethodChange = useCallback((event, value) => {
  //   setMethod(value);
  // }, []);

  const handleSkip = useCallback(() => {
    auth.skip();
    router.push("/auth/register");
  }, [auth, router]);

  return (
    <>
      <Head>
        <title>Login | PrinterKu</title>
      </Head>
      <div
        style={{
          border: 1,
          width: "15%",
          height: "300px",
          transform: "translate(800%, -60%)",
          borderRadius: 500,
          background: "#E74A3B",
          position: "absolute",
        }}
      >
        {" "}
      </div>
      <div
        style={{
          border: 1,
          width: "15%",
          height: "300px",
          transform: "translate(-200%, -60%)",
          borderRadius: 500,
          background: "#E74A3B",
          position: "absolute",
        }}
      >
        {" "}
      </div>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h3" sx={{ textAlign: "center" }}>
                Login
              </Typography>
              <Typography variant="h1">Selamat Datang</Typography>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                Login terlebih dahulu untuk mengakses web
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button fullWidth size="large" sx={{ my: 2 }} type="submit" variant="contained">
                  Log in with gmail
                </Button>
              </Box>
            </Stack>

            {method === "email" && (
              <form noValidate onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email Address"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
                  />
                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Password"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                  />
                </Stack>
                {formik.errors.submit && (
                  <Typography color="error" sx={{ mt: 3 }} variant="body2">
                    {formik.errors.submit}
                  </Typography>
                )}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Button fullWidth size="medium" sx={{ m: 2 }} type="submit" variant="contained">
                    Log in
                  </Button>
                  <Button
                    fullWidth
                    size="medium"
                    variant="contained"
                    sx={{ m: 2 }}
                    onClick={handleSkip}
                  >
                    Register
                  </Button>
                </Box>
              </form>
            )}
            {/* {method === "phoneNumber" && (
              <div>
                <Typography sx={{ mb: 1 }} variant="h6">
                  Not available in the demo
                </Typography>
                <Typography color="text.secondary">
                  To prevent unnecessary costs we disabled this feature in the demo.
                </Typography>
              </div>
            )} */}
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
