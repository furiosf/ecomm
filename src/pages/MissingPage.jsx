import ContentShell from '../components/ContentShell';
import EmptyResults from '../components/EmptyResults';

function MissingPage() {
  return (
    <ContentShell>
      <EmptyResults
        icon="search"
        title="404, page not found"
        message="The page you are looking for does not exist. Use the menu above or head back to the shop."
        actionLabel="Back to shop"
        actionTo="/"
      />
    </ContentShell>
  );
}

export default MissingPage;
