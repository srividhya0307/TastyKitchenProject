import './SomethingWentWrong.css'

const SomethingWentWrong = ({onRetry}) => (
  <main className="something-wrong">
    <h1>Something went wrong</h1>
    <p>We could not load this information.</p>
    {onRetry && (
      <button type="button" onClick={onRetry}>
        Try Again
      </button>
    )}
  </main>
)

export default SomethingWentWrong
