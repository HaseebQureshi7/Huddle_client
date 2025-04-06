interface ILoading {
  scale?: number;
  type?: "button" | "page"
}

function Loading({ scale = 1 ,type="page" }: ILoading) {
  if (type == "button") {
    return <div className="loader" style={{ scale }} />;
  }

  return <img className="logo-loader" style={{
    maxWidth:"35px",
    scale,
  }} src="/images/huddle-logo-top.png" />
}

export default Loading;
