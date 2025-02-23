export default function Calendar() {
  return (
    <div className="rounded-container">
      <h4 className="mb-4">이번달 평균 달성률</h4>
      <h3 className="mb-6 text-head3 desktop:text-head2">
        {'n'}월에는 100%에 <span className="text-main">{`n`}번</span>
        도달했어요!
      </h3>
    </div>
  );
}
