export default function FlashMessage({ isVisible, text }) {
  if (isVisible) {
    return (
      <div className={`p-4 mb-4 text-sm rounded-lg max-w-sm mx-auto mt-4  ${text && text[2] ? 'text-red-700 bg-red-100' : 'bg-green-200 text-green-800'}`} role="alert">
        <span className="font-bold">{text ? text[0] : 'tidak ada pesan'}</span> {text ? text[1] : ''}
      </div>
    );
  } else {
    return <div></div>;
  }
}
