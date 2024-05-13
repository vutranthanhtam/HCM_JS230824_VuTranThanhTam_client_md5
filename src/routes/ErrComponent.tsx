export default function ErrComponent({ url }: {
    url: string
  }) {
    window.location.href = url
    localStorage.removeItem('token')
    return (
      <div></div>
    )
  }