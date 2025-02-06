import React from 'react';

interface Props {
  title: string;
  subTitle: string;
}

export default function NoteHeader(props: Props) {
  const {
    title = '자바스크립트로 웹 서비스 만들기',
    subTitle = '자바스크립트기초챕터자바스크립트기초챕터자바스크립트기초챕터'
  } = props;

  return (
    <div className="w-full py-[5px]">
      <div className="flex items-center justify-between py-[5px]">
        <h2 className="text-base text-slate-900">노트 작성</h2>
        <div className="flex gap-2">
          <button className="h-[36px] w-[84px] rounded-xl text-[14px] font-semibold text-blue-500">
            임시 저장
          </button>
          <button className="h-[36px] w-[84px] rounded-xl bg-slate-400 text-[14px] font-semibold text-white">
            작성 완료
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2 py-[5px]">
        <div className="h-6 w-6">
          <svg
            width="24"
            height="24"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="120" height="120" rx="30" fill="white" />
            <path
              d="M80.1125 36.0762C81.4379 36.6724 82.6642 37.5085 83.7194 38.5653C84.5314 39.3764 85.213 40.2886 85.7554 41.2691L100.682 67.1232C104.043 72.9436 102.048 80.386 96.2281 83.7464C90.4078 87.1068 82.9654 85.1126 79.6049 79.2922L75.4 72.0091L75.5444 71.7591L75.1114 71.5091L74.6783 71.7591L74.8227 72.0091L80.1125 36.0762ZM80.1125 36.0762C78.5008 35.3474 76.797 34.9985 75.112 35L80.1125 36.0762ZM36.946 38.9216L36.9464 38.9212C37.9589 37.9065 39.136 37.1038 40.4088 36.5315L40.4097 36.5311C41.9548 35.8327 43.5877 35.4985 45.2029 35.5L45.2038 35.5C46.8177 35.4985 48.4494 35.8322 49.9934 36.5295L49.9943 36.5299C51.2708 37.1033 52.4511 37.9085 53.4656 38.9266L53.4661 38.927C54.2406 39.7023 54.8911 40.5736 55.4094 41.5103L55.4093 41.5103L55.4139 41.5182L59.7243 48.9841L60.1573 49.7341L60.5904 48.9841L64.9002 41.5192L64.9003 41.5192L64.9047 41.5112C65.4252 40.5705 66.0789 39.6957 66.8578 38.9179L66.8582 38.9174C67.869 37.9053 69.0439 37.1042 70.3141 36.5327L70.315 36.5323C71.8611 35.833 73.4952 35.4984 75.1115 35.5L75.1124 35.5C76.7279 35.4986 78.3611 35.833 79.9065 36.5318L79.9074 36.5322C81.1786 37.104 82.3542 37.9056 83.3656 38.9186L83.366 38.9191C84.1443 39.6965 84.7978 40.571 85.3179 41.5112L85.3178 41.5112L85.3224 41.5191L100.249 67.3732C103.472 72.9544 101.559 80.0911 95.9781 83.3134C90.3969 86.5357 83.2603 84.6234 80.038 79.0422L75.5444 71.2591L75.1114 70.5091L74.6783 71.2591L71.1391 77.3891C70.8865 77.7685 70.6459 78.1419 70.4106 78.5071C69.1553 80.4553 68.0504 82.17 66.0701 83.3134C64.2055 84.3899 62.1688 84.893 60.1622 84.8784L60.1549 84.8785C58.1475 84.8935 56.1099 84.3904 54.2446 83.3134C52.0176 82.0277 51.0491 80.447 49.4595 77.8527C49.3685 77.7042 49.2755 77.5523 49.1801 77.397L45.6363 71.259L45.2033 70.509L44.7703 71.259L40.2767 79.0422C37.0544 84.6234 29.9177 86.5357 24.3365 83.3134L24.0865 83.7464L24.3365 83.3134C18.7553 80.0911 16.8431 72.9544 20.0654 67.3732L34.9923 41.5191L34.9924 41.5191L34.9968 41.5111C35.5164 40.572 36.1689 39.6984 36.946 38.9216Z"
              fill="url(#paint0_linear_2083_12484)"
              stroke="#F2EFEF"
            />
            <defs>
              <linearGradient
                id="paint0_linear_2083_12484"
                x1="60.1573"
                y1="35"
                x2="60.1573"
                y2="85.3788"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#F86969" />
                <stop offset="1" stop-color="#FBA5A5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h3 className="text-slate-800">{title}</h3>
      </div>
      <div className="flex items-center gap-2 py-[5px]">
        <div>
          <button
            className="h-[20px] w-[37px] rounded bg-slate-100 px-[3px] py-[2px] text-[12px] font-medium text-slate-700"
            disabled
          >
            To do
          </button>
        </div>
        <h4 className="truncate text-slate-700">{subTitle}</h4>
      </div>
    </div>
  );
}
