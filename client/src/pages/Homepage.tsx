import { LinkForm } from "../components/LinkForm/LinkForm";
import { HeaderText } from "../components/HeaderText";
import { Layout } from "../components/Layout";
import { PromoSection } from "../components/PromoSection";

export const Homepage = () => {
  return (
    <Layout>
      <HeaderText />
      <LinkForm />
      <PromoSection />
    </Layout>
  );
};
