import { useNavigate, TitleBar, Loading } from "@shopify/app-bridge-react";
import {
  AlphaCard,
  Card,
  EmptyState,
  Layout,
  Page,
  SkeletonBodyText,
} from "@shopify/polaris";
import { QRCodeIndex } from "../components";
import { useAppQuery } from "../hooks";



export default function HomePage() {
  /*
    Add an App Bridge useNavigate hook to set up the navigate function.
    This function modifies the top-level browser URL so that you can
    navigate within the embedded app and keep the browser in sync on reload.
  */
  const navigate = useNavigate();

  /* useAppQuery wraps react-query and the App Bridge authenticatedFetch function */
const {
  // data: QRCodes,
  data: Products,
  isLoading,

  /*
    react-query provides stale-while-revalidate caching.
    By passing isRefetching to Index Tables we can show stale data and a loading state.
    Once the query refetches, IndexTable updates and the loading state is removed.
    This ensures a performant UX.
  */
  isRefetching,
} = useAppQuery({
  url: "/api/shop-data2",
});

  
  /* Set the QR codes to use in the list */
// const qrCodesMarkup = QRCodes?.length ? (
//   <QRCodeIndex QRCodes={QRCodes} loading={isRefetching} />
// ) : null;

const productsMarkup = Products?.length ? Products.map((p) => {
  return <AlphaCard>
    <h2>{p.title}</h2>
    <img src={p.imageUrl} />
  </AlphaCard>
}) : null


  /* loadingMarkup uses the loading component from AppBridge and components from Polaris  */
  const loadingMarkup = isLoading ? (
    <Card sectioned>
      <Loading />
      <SkeletonBodyText />
    </Card>
  ) : null;

  /* Use Polaris Card and EmptyState components to define the contents of the empty state */
  const emptyStateMarkup =
    !isLoading && !Products?.length ? (
      <Card sectioned>
        <EmptyState
          heading="View list of Products"
          /* This button will take the user to a Create a QR code page */
          action={{
            content: "Create a product?",
            onAction: () => navigate("/products"),
          }}
          image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        >
          <p>
            Allow customers to scan codes and buy products using their phones.
          </p>
        </EmptyState>
      </Card>
    ) : null;

  /*
    Use Polaris Page and TitleBar components to create the page layout,
    and include the empty state contents set above.
  */
  return (
    <Page fullWidth={!!productsMarkup}>
    <TitleBar
      title="Products Demo"
      primaryAction={{
        content: "Create a product",
        onAction: () => navigate("/products"),
      }}
    />
    <Layout>
      <Layout.Section>
        {loadingMarkup}
        {/* {qrCodesMarkup} */}
        {productsMarkup}
        {emptyStateMarkup}
      </Layout.Section>
    </Layout>
  </Page>
  );
}
