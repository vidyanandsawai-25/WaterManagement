import svgPaths from "./svg-mvc6vv2h33";
import clsx from "clsx";
import imgImageMaharashtraMunicipalCorporationLogo from "figma:asset/2ace7e0bf1082044c0cdc8f0827b8cabf2f06a0c.png";
import imgApp from "figma:asset/32de86388d824fe7968a4cc79a8ad3203d01778a.png";
import imgReportEngine from "figma:asset/32a53904cdb2f84aba99f830aa52e4f10dd2974d.png";

function ContainerBackgroundImage3({ children }: React.PropsWithChildren<{}>) {
  return (
    <div style={{ backgroundImage: "linear-gradient(162.084deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)" }} className="absolute content-stretch flex gap-[3.695px] h-[25px] items-center left-[246.92px] pl-[8.695px] pr-px py-px rounded-[14px] top-0 w-[77.328px]">
      {children}
    </div>
  );
}
type BackgroundImage9Props = {
  additionalClassNames?: string;
};

function BackgroundImage9({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage9Props>) {
  return (
    <div style={{ "--transform-inner-width": "0", "--transform-inner-height": "0" } as React.CSSProperties} className={additionalClassNames}>
      {children}
    </div>
  );
}
type BackgroundImage8Props = {
  additionalClassNames?: string;
};

function BackgroundImage8({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage8Props>) {
  return <BackgroundImage9 additionalClassNames={clsx("flex items-center justify-center relative shrink-0", additionalClassNames)}>{children}</BackgroundImage9>;
}

function BackgroundImage7({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage8 additionalClassNames="size-[19.379px]">
      <div className="flex-none rotate-[5.673deg]">{children}</div>
    </BackgroundImage8>
  );
}

function ContainerBackgroundImage2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[15px] opacity-0 relative shrink-0 w-[89.766px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4.143px] items-center pl-[-1.857px] pr-0 py-0 relative size-full">{children}</div>
    </div>
  );
}

function ContainerBackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[324.25px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImage6Props = {
  additionalClassNames?: string;
};

function BackgroundImage6({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage6Props>) {
  return (
    <BackgroundImage9 additionalClassNames={clsx("absolute flex items-center justify-center left-[25.37px] top-[0.42px]", additionalClassNames)}>
      <div className="flex-none rotate-[108.761deg]">{children}</div>
    </BackgroundImage9>
  );
}

function BackgroundImage5({ children }: React.PropsWithChildren<{}>) {
  return (
    <BackgroundImage8 additionalClassNames="size-[22.989px]">
      <div className="flex-none rotate-[146.846deg]">{children}</div>
    </BackgroundImage8>
  );
}
type ReportCardBackgroundImageProps = {
  additionalClassNames?: string;
};

function ReportCardBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<ReportCardBackgroundImageProps>) {
  return (
    <div className={clsx("h-[15px] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">{children}</div>
    </div>
  );
}
type ContainerBackgroundImageProps = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerBackgroundImageProps>) {
  return (
    <div className={clsx("relative", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">{children}</div>
    </div>
  );
}
type PrimitiveButtonBackgroundImageProps = {
  additionalClassNames?: string;
};

function PrimitiveButtonBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<PrimitiveButtonBackgroundImageProps>) {
  return (
    <div className={clsx("bg-[rgba(255,255,255,0.1)] h-[36px] relative rounded-[8px] shrink-0", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[13px] py-px relative size-full">{children}</div>
    </div>
  );
}

function BackgroundImage4({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[56px] relative shrink-0 w-[324.25px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImage3Props = {
  additionalClassNames?: string;
};

function BackgroundImage3({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage3Props>) {
  return (
    <div className={additionalClassNames}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        {children}
      </svg>
    </div>
  );
}
type BackgroundImage2Props = {
  additionalClassNames?: string;
};

function BackgroundImage2({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage2Props>) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 45 50">
        {children}
      </svg>
    </div>
  );
}
type BackgroundImage1Props = {
  additionalClassNames?: string;
};

function BackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage1Props>) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 5">
        {children}
      </svg>
    </div>
  );
}

function IconBackgroundImage5({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute left-[14px] size-[28px] top-[14px]">
      <div className="absolute inset-[-27.38%_-38.69%_-41.67%_-38.69%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 48">
          {children}
        </svg>
      </div>
    </div>
  );
}

function VectorBackgroundImage9({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute bottom-[20.83%] left-1/2 right-[20.83%] top-[20.83%]">
      <div className="absolute inset-[-7.14%_-14.29%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 10">
          {children}
        </svg>
      </div>
    </div>
  );
}

function VectorBackgroundImage8({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2">
      <div className="absolute inset-[-0.58px_-7.14%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 2">
          {children}
        </svg>
      </div>
    </div>
  );
}

function VectorBackgroundImage7({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute bottom-[8.33%] left-[8.33%] right-3/4 top-3/4">
      <div className="absolute inset-[-25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
          {children}
        </svg>
      </div>
    </div>
  );
}

function VectorBackgroundImage6({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute bottom-[83.33%] left-3/4 right-[8.33%] top-[16.67%]">
      <div className="absolute inset-[-0.74px_-25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 2">
          {children}
        </svg>
      </div>
    </div>
  );
}

function VectorBackgroundImage5({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute bottom-3/4 left-[83.33%] right-[16.67%] top-[8.33%]">
      <BackgroundImage1 additionalClassNames="inset-[-25%_-0.74px]">{children}</BackgroundImage1>
    </div>
  );
}

function VectorBackgroundImage4({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute inset-[8.32%]">
      <div className="absolute inset-[-5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
          {children}
        </svg>
      </div>
    </div>
  );
}

function IconBackgroundImage4({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute left-[14px] size-[28px] top-[14px]">
      <BackgroundImage2 additionalClassNames="inset-[-31.55%_-30.36%_-45.83%_-30.36%]">{children}</BackgroundImage2>
    </div>
  );
}
type IconBackgroundImage3Props = {
  additionalClassNames?: string;
};

function IconBackgroundImage3({ children, additionalClassNames = "" }: React.PropsWithChildren<IconBackgroundImage3Props>) {
  return (
    <BackgroundImage3 additionalClassNames={clsx("absolute size-[16px] top-[10px]", additionalClassNames)}>
      <g id="Icon">{children}</g>
    </BackgroundImage3>
  );
}

function VectorBackgroundImage3({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute bottom-[8.33%] left-[8.33%] right-3/4 top-3/4">
      <div className="absolute inset-[-25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
          {children}
        </svg>
      </div>
    </div>
  );
}

function VectorBackgroundImage2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute bottom-[83.33%] left-3/4 right-[8.33%] top-[16.67%]">
      <div className="absolute inset-[-0.49px_-25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 1">
          {children}
        </svg>
      </div>
    </div>
  );
}

function VectorBackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute bottom-3/4 left-[83.33%] right-[16.67%] top-[8.33%]">
      <div className="absolute inset-[-25%_-0.49px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 3">
          {children}
        </svg>
      </div>
    </div>
  );
}

function VectorBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute inset-[8.32%]">
      <div className="absolute inset-[-5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
          {children}
        </svg>
      </div>
    </div>
  );
}

function BackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[17.875px] relative shrink-0 w-[324.25px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[17.875px] min-h-px min-w-px not-italic relative shrink-0 text-[#4a5565] text-[11px]">{children}</p>
      </div>
    </div>
  );
}

function IconBackgroundImage2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[16.609px] overflow-clip relative shrink-0 w-full">
      <div className="absolute inset-[8.32%_12.49%]" data-name="Vector">
        <div className="absolute inset-[-5%_-5.55%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 16">
            {children}
          </svg>
        </div>
      </div>
    </div>
  );
}
type Icon46VectorBackgroundImageProps = {
  additionalClassNames?: string;
};

function Icon46VectorBackgroundImage({ additionalClassNames = "" }: Icon46VectorBackgroundImageProps) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <div className="absolute inset-[-0.83px_-12.5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 2">
          <path d="M7.5 0.833333H0.833333" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </svg>
      </div>
    </div>
  );
}
type TabNavigationBackgroundImageAndTextProps = {
  text: string;
};

function TabNavigationBackgroundImageAndText({ text }: TabNavigationBackgroundImageAndTextProps) {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full">
      <p className="font-['Poppins:Medium',sans-serif] leading-[21px] not-italic relative shrink-0 text-[#364153] text-[14px] text-center text-nowrap">{text}</p>
    </div>
  );
}
type ParagraphBackgroundImageAndTextProps = {
  text: string;
};

function ParagraphBackgroundImageAndText({ text }: ParagraphBackgroundImageAndTextProps) {
  return <BackgroundImage>{text}</BackgroundImage>;
}
type HeadingBackgroundImageAndTextProps = {
  text: string;
};

function HeadingBackgroundImageAndText({ text }: HeadingBackgroundImageAndTextProps) {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[324.25px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Poppins:Bold',sans-serif] leading-[18.75px] left-0 not-italic text-[#101828] text-[15px] text-nowrap top-0 tracking-[-0.375px]">{text}</p>
      </div>
    </div>
  );
}
type IconBackgroundImage1Props = {
  additionalClassNames?: string;
};

function IconBackgroundImage1({ additionalClassNames = "" }: IconBackgroundImage1Props) {
  return (
    <div className={clsx("h-[11.664px] overflow-clip relative shrink-0 w-full", additionalClassNames)}>
      <VectorBackgroundImage>
        <path d={svgPaths.pb80dd00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.971995" />
      </VectorBackgroundImage>
      <VectorBackgroundImage1>
        <path d="M0.485997 0.485997V2.42999" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.971995" />
      </VectorBackgroundImage1>
      <VectorBackgroundImage2>
        <path d="M2.42999 0.485997H0.485997" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.971995" />
      </VectorBackgroundImage2>
      <VectorBackgroundImage3>
        <path d={svgPaths.p3a08ee00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.971995" />
      </VectorBackgroundImage3>
    </div>
  );
}

function IconBackgroundImage() {
  return (
    <BackgroundImage3 additionalClassNames="relative shrink-0 size-[16px]">
      <g id="Icon" opacity="0.5">
        <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      </g>
    </BackgroundImage3>
  );
}
type PrimitiveSpanBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function PrimitiveSpanBackgroundImageAndText({ text, additionalClassNames = "" }: PrimitiveSpanBackgroundImageAndTextProps) {
  return (
    <div className={clsx("h-[18.563px] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Poppins:Regular',sans-serif] leading-[18.571px] not-italic relative shrink-0 text-[13px] text-center text-nowrap text-white">{text}</p>
      </div>
    </div>
  );
}

export default function ReportsDashboardDesign() {
  return (
    <div className="bg-white relative size-full" data-name="Reports Dashboard Design">
      <div className="absolute bg-gradient-to-b from-[#f0f9ff] h-[952px] left-0 overflow-clip to-[#f0f9ff] top-0 via-50% via-[#e0f2fe] w-[1645px]" data-name="App">
        <div className="absolute h-0 left-0 top-0 w-[1645px]" data-name="Container" />
        <div className="absolute h-[797.563px] left-[72px] top-0 w-[1573px]" data-name="Container">
          <div className="absolute bg-gradient-to-b content-stretch flex flex-col from-[#005aa7] gap-[16px] h-[138.563px] items-start left-0 pb-0 pt-[16px] px-[24px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] to-[#00c6ff] top-0 via-50% via-[#0077bb] w-[1573px]" data-name="Header">
            <div className="content-stretch flex h-[56px] items-center justify-between relative shrink-0 w-full" data-name="Header">
              <div className="h-[56px] relative shrink-0 w-[357.563px]" data-name="Container">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
                  <div className="bg-white relative rounded-[3.35544e+07px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 size-[56px]" data-name="Container">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                      <div className="relative shrink-0 size-[48px]" data-name="Image (Maharashtra Municipal Corporation Logo)">
                        <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageMaharashtraMunicipalCorporationLogo} />
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
                      </div>
                    </div>
                  </div>
                  <div className="basis-0 grow h-[25px] min-h-px min-w-px relative shrink-0" data-name="Heading 1">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                      <p className="absolute font-['Poppins:SemiBold',sans-serif] leading-[25px] left-0 not-italic text-[20px] text-nowrap text-white top-0">Akola Muncipal Corporation</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[36px] relative shrink-0 w-[804.375px]" data-name="Container">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center overflow-clip relative rounded-[inherit] size-full">
                  <PrimitiveButtonBackgroundImage additionalClassNames="w-[140px]">
                    <PrimitiveSpanBackgroundImageAndText text="2024-25" additionalClassNames="w-[55.547px]" />
                    <IconBackgroundImage />
                  </PrimitiveButtonBackgroundImage>
                  <PrimitiveButtonBackgroundImage additionalClassNames="w-[140px]">
                    <PrimitiveSpanBackgroundImageAndText text="All Zones" additionalClassNames="w-[60.063px]" />
                    <IconBackgroundImage />
                  </PrimitiveButtonBackgroundImage>
                  <PrimitiveButtonBackgroundImage additionalClassNames="w-[110px]">
                    <BackgroundImage3 additionalClassNames="relative shrink-0 size-[16px]">
                      <g clipPath="url(#clip0_2355_877)" id="Icon">
                        <path d={svgPaths.p1a356800} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        <path d={svgPaths.p5fcf400} id="Vector_2" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        <path d="M1.33333 3.33333H9.33333" id="Vector_3" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        <path d="M4.66667 1.33333H5.33333" id="Vector_4" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        <path d={svgPaths.p1bfa36c0} id="Vector_5" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        <path d="M9.33333 12H13.3333" id="Vector_6" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      </g>
                      <defs>
                        <clipPath id="clip0_2355_877">
                          <rect fill="white" height="16" width="16" />
                        </clipPath>
                      </defs>
                    </BackgroundImage3>
                    <PrimitiveSpanBackgroundImageAndText text="English" additionalClassNames="w-[32px]" />
                    <IconBackgroundImage />
                  </PrimitiveButtonBackgroundImage>
                  <div className="basis-0 bg-gradient-to-r from-[#00bc7d] grow h-[36px] min-h-px min-w-px relative rounded-[8px] shrink-0 to-[#009689]" data-name="Button">
                    <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                      <IconBackgroundImage3 additionalClassNames="left-[11px]">
                        <path d={svgPaths.p28b0a6c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        <path d={svgPaths.p2f10900} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        <path d="M8 12V8" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        <path d="M6 10L8 12L10 10" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      </IconBackgroundImage3>
                      <div className="absolute h-[18.563px] left-[41px] top-[8.72px] w-[87.172px]" data-name="Header">
                        <p className="absolute font-['Poppins:SemiBold',sans-serif] leading-[18.571px] left-[44px] not-italic text-[13px] text-center text-nowrap text-white top-0 translate-x-[-50%]">Daily Reports</p>
                      </div>
                      <div className="absolute left-[-1242.63px] size-0 top-[-26px]" data-name="Header">
                        <p className="absolute font-['Poppins:SemiBold',sans-serif] leading-[18.571px] left-0 not-italic text-[13px] text-center text-white top-px translate-x-[-50%] w-0">Daily</p>
                      </div>
                      <IconBackgroundImage3 additionalClassNames="left-[138.17px]">
                        <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      </IconBackgroundImage3>
                    </div>
                  </div>
                  <div className="bg-[rgba(255,255,255,0.1)] h-[36px] relative rounded-[8px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 w-[90.25px]" data-name="Button">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                      <IconBackgroundImage3 additionalClassNames="left-[10px]">
                        <path d="M8 10V2" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        <path d={svgPaths.p23ad1400} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        <path d={svgPaths.p19411800} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      </IconBackgroundImage3>
                      <div className="absolute h-[18.563px] left-[40px] top-[8.72px] w-[40.25px]" data-name="Header">
                        <p className="absolute font-['Poppins:Medium',sans-serif] leading-[18.571px] left-[20.5px] not-italic text-[13px] text-center text-nowrap text-white top-0 translate-x-[-50%]">Export</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[rgba(255,255,255,0.1)] h-[36px] relative rounded-[8px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 w-[98.953px]" data-name="Button">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                      <IconBackgroundImage3 additionalClassNames="left-[10px]">
                        <path d={svgPaths.p19987d80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        <path d="M14 2V5.33333H10.6667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        <path d={svgPaths.p2a3e9c80} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        <path d="M5.33333 10.6667H2V14" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                      </IconBackgroundImage3>
                      <div className="absolute h-[18.563px] left-[40px] top-[8.72px] w-[48.953px]" data-name="Header">
                        <p className="absolute font-['Poppins:Medium',sans-serif] leading-[18.571px] left-[24.5px] not-italic text-[13px] text-center text-nowrap text-white top-0 translate-x-[-50%]">Refresh</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-b from-[#e0f2fe] h-[34.563px] relative rounded-[14px] shrink-0 to-[#e0f2fe] via-50% via-[#bae6fd] w-full" data-name="Header">
              <div className="overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex flex-col items-start pb-0 pl-[70.413px] pr-[-38.413px] pt-[8px] relative size-full">
                  <div className="h-[18.563px] relative shrink-0 w-full" data-name="Container">
                    <p className="absolute font-['Poppins:Medium',sans-serif] leading-[18.571px] left-0 not-italic text-[#005aa7] text-[13px] text-nowrap top-0">📰 Notice: Water supply will be interrupted in Zone A on 12th Nov 2025 due to maintenance work. | 📢 Public hearing scheduled for water tariff revision on 15th Nov 2025 at Municipal Office. | 💳 New online payment portal launched for faster and secure bill settlements. | 🚰 Free water quality testing available for all consumers this month. | ⚡ 24x7 helpline: 1800-123-4567 for water-related complaints and queries.</p>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]" />
            </div>
          </div>
          <div className="absolute bg-[rgba(255,255,255,0.6)] border-[#e5e7eb] border-[0px_0px_1px] border-solid h-[33px] left-0 top-[244.56px] w-[1573px]" data-name="Container" />
          <div className="absolute content-stretch flex flex-col gap-[24px] h-[422px] items-start left-[24px] top-[359.56px] w-[1525px]" data-name="ReportEngine">
            <div className="content-stretch flex flex-col h-[48px] items-start relative shrink-0 w-full" data-name="Container">
              <div className="content-stretch flex h-[24px] items-start relative shrink-0 w-full" data-name="Heading 2">
                <p className="basis-0 bg-clip-text font-['Poppins:Regular',sans-serif] grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0)]" style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(rgb(0, 90, 167) 0%, rgb(0, 198, 255) 100%)" }}>
                  Water Report Engine
                </p>
              </div>
              <div className="content-stretch flex h-[24px] items-start relative shrink-0 w-full" data-name="Paragraph">
                <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[#364153] text-[16px]">Generate and analyze detailed water management reports</p>
              </div>
            </div>
            <div className="gap-[20px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(2,_minmax(0px,_1fr))] h-[350px] relative shrink-0 w-full" data-name="Container">
              <div className="[grid-area:1_/_1] place-self-stretch relative rounded-[24px] shrink-0" data-name="Button" style={{ backgroundImage: "linear-gradient(155.748deg, rgba(14, 165, 233, 0.03) 0%, rgba(14, 165, 233, 0.016) 40%, rgb(255, 255, 255) 70%, rgba(14, 165, 233, 0.01) 100%)" }}>
                <div className="overflow-clip relative rounded-[inherit] size-full">
                  <div className="absolute h-[163px] left-px top-px w-[364.25px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 364.25 163\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -23.052 -51.513 0 0 0)\\'><stop stop-color=\\'rgba(14,165,233,0.082)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 364.25 163\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -23.052 -51.513 0 364.25 0)\\'><stop stop-color=\\'rgba(14,165,233,0.063)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 364.25 163\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -23.052 -51.513 0 0 163)\\'><stop stop-color=\\'rgba(14,165,233,0.03)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 364.25 163\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -23.052 -51.513 0 364.25 163)\\'><stop stop-color=\\'rgba(14,165,233,0.07)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>')" }} />
                  <div className="absolute h-[163px] left-px opacity-5 top-px w-[364.25px]" data-name="Container" style={{ backgroundImage: "linear-gradient(rgb(14, 165, 233) 0.6135%, rgba(0, 0, 0, 0) 0.6135%), linear-gradient(90deg, rgb(14, 165, 233) 0.27454%, rgba(0, 0, 0, 0) 0.27454%)" }} />
                  <div className="absolute blur-3xl filter left-[105.85px] opacity-25 rounded-[3.35544e+07px] size-[128px] top-[105.85px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 128 128\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -9.051 -9.051 0 64 64)\\\'><stop stop-color=\\\'rgba(14,165,233,0.376)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(14,165,233,0.19)\\\' offset=\\\'0.5\\\'/><stop stop-color=\\\'rgba(7,83,117,0.095)\\\' offset=\\\'0.6\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'0.7\\\'/></radialGradient></defs></svg>')" }} />
                  <div className="absolute h-[163px] left-[650.14px] top-px w-[364.25px]" data-name="Container" style={{ backgroundImage: "linear-gradient(129.123deg, rgba(0, 0, 0, 0) 41.697%, rgba(14, 165, 233, 0.082) 50%, rgba(0, 0, 0, 0) 58.303%)" }} />
                  <div className="absolute bg-gradient-to-b blur filter from-[rgba(0,0,0,0)] h-[79.178px] left-[2.87px] opacity-30 to-[rgba(14,165,233,0.25)] top-[90.58px] via-50% via-[rgba(14,165,233,0.19)] w-[360.507px]" data-name="Container" />
                  <div className="absolute h-[4px] left-px rounded-[3.35544e+07px] shadow-[0px_0px_20px_0px_rgba(14,165,233,0.38),0px_-2px_10px_0px_rgba(14,165,233,0.25)] top-[160px] w-[364.25px]" data-name="Container" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(14, 165, 233, 0.25) 20%, rgb(14, 165, 233) 50%, rgba(14, 165, 233, 0.25) 80%, rgba(0, 0, 0, 0) 100%)" }} />
                  <div className="absolute bg-[#0ea5e9] blur-2xl filter left-[293.12px] opacity-0 rounded-[3.35544e+07px] size-[80.256px] top-[-7.13px]" data-name="Container" />
                  <div className="absolute bg-[#0ea5e9] blur-2xl filter left-[-7.3px] opacity-0 rounded-[3.35544e+07px] size-[80.59px] top-[91.7px]" data-name="Container" />
                  <div className="absolute bg-[#0ea5e9] left-[74.15px] opacity-[0.328] rounded-[3.35544e+07px] size-[3.383px] top-[22.97px]" data-name="Container" />
                  <div className="absolute bg-[#0ea5e9] left-[183.64px] opacity-[0.477] rounded-[3.35544e+07px] size-[2.97px] top-[58.77px]" data-name="Container" />
                  <div className="absolute bg-[#0ea5e9] left-[292.92px] opacity-[0.075] rounded-[3.35544e+07px] size-[2.937px] top-[70.93px]" data-name="Container" />
                  <div className="absolute content-stretch flex flex-col gap-[12px] h-[123px] items-start left-[21px] pb-[-37.625px] pt-0 px-0 top-[21px] w-[324.25px]" data-name="ReportCard">
                    <BackgroundImage4>
                      <ContainerBackgroundImage3>
                        <div aria-hidden="true" className="absolute border border-[rgba(14,165,233,0.14)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_4px_12px_0px_rgba(14,165,233,0.08)]" />
                        <BackgroundImage5>
                          <ContainerBackgroundImage additionalClassNames="size-[16.609px]">
                            <IconBackgroundImage2>
                              <path d={svgPaths.p1c62f200} id="Vector" stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.38409" />
                            </IconBackgroundImage2>
                          </ContainerBackgroundImage>
                        </BackgroundImage5>
                        <ReportCardBackgroundImage additionalClassNames="w-[37.328px]">
                          <p className="font-['Poppins:SemiBold',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#0ea5e9] text-[10px] text-nowrap tracking-[0.25px]">ACTIVE</p>
                        </ReportCardBackgroundImage>
                      </ContainerBackgroundImage3>
                      <div className="absolute left-0 size-[56px] top-0" data-name="Container">
                        <div className="absolute blur filter left-[-4.39px] opacity-0 rounded-[16px] size-[64.772px] top-[-4.39px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 64.772 64.772\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -4.58 -4.58 0 32.386 32.386)\\\'><stop stop-color=\\\'rgba(14,165,233,0.145)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(7,83,117,0.0725)\\\' offset=\\\'0.35\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'0.7\\\'/></radialGradient></defs></svg>')" }} />
                        <div className="absolute left-0 overflow-clip rounded-[16px] shadow-[0px_8px_24px_0px_rgba(14,165,233,0.19)] size-[56px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(14, 165, 233, 0.125) 0%, rgba(14, 165, 233, 0.208) 50%, rgba(14, 165, 233, 0.145) 100%)" }}>
                          <div className="absolute bg-gradient-to-b from-[rgba(255,255,255,0.6)] h-[28px] left-0 opacity-40 rounded-tl-[16px] rounded-tr-[16px] to-[rgba(0,0,0,0)] top-0 w-[56px]" data-name="ReportCard" />
                          <div className="absolute left-[56px] opacity-0 size-[56px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(0, 0, 0, 0) 30%, rgba(255, 255, 255, 0.6) 50%, rgba(0, 0, 0, 0) 70%)" }} />
                          <BackgroundImage6 additionalClassNames="size-[14.796px]">
                            <div className="content-stretch flex flex-col items-start opacity-0 relative size-[11.664px]" data-name="Container">
                              <IconBackgroundImage1 additionalClassNames="shadow-[0px_0px_8px_0px_#0ea5e9]" />
                            </div>
                          </BackgroundImage6>
                          <IconBackgroundImage4>
                            <g filter="url(#filter0_d_2355_862)" id="Icon">
                              <path d={svgPaths.p121f7580} id="Vector" stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
                              <path d={svgPaths.p3a467400} id="Vector_2" stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
                              <path d="M20.1667 19.3333H17.8333" id="Vector_3" stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
                              <path d="M27.1667 24H17.8333" id="Vector_4" stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
                              <path d="M27.1667 28.6667H17.8333" id="Vector_5" stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
                            </g>
                            <defs>
                              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="52" id="filter0_d_2355_862" width="52" x="-3.5" y="-1.16667">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                <feOffset dy="2" />
                                <feGaussianBlur stdDeviation="6" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_2355_862" />
                                <feBlend in="SourceGraphic" in2="effect1_dropShadow_2355_862" mode="normal" result="shape" />
                              </filter>
                            </defs>
                          </IconBackgroundImage4>
                          <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.5),inset_0px_-2px_8px_0px_rgba(14,165,233,0.13)]" />
                        </div>
                        <div className="absolute border-2 border-[#0ea5e9] border-solid left-[-9.93px] opacity-[0.109] rounded-[16px] size-[75.87px] top-[-9.93px]" data-name="Container" />
                        <div className="absolute border-2 border-[#0ea5e9] border-solid left-[-12.86px] opacity-[0.176] rounded-[16px] size-[81.721px] top-[-12.86px]" data-name="Container" />
                      </div>
                    </BackgroundImage4>
                    <ContainerBackgroundImage1>
                      <HeadingBackgroundImageAndText text="Top Defaulter" />
                      <ParagraphBackgroundImageAndText text="View list of highest outstanding consumers" />
                    </ContainerBackgroundImage1>
                    <div className="h-[36px] relative shrink-0 w-[324.25px]" data-name="Container">
                      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(14,165,233,0.06)] border-solid inset-0 pointer-events-none" />
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-0 pt-px px-0 relative size-full">
                        <ContainerBackgroundImage2>
                          <BackgroundImage7>
                            <ContainerBackgroundImage additionalClassNames="size-[17.714px]">
                              <div className="h-[17.714px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                                <VectorBackgroundImage4>
                                  <path d={svgPaths.p20c7f880} id="Vector" stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.47619" />
                                </VectorBackgroundImage4>
                                <VectorBackgroundImage5>
                                  <path d="M0.738096 0.738096V3.69048" id="Vector" stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.47619" />
                                </VectorBackgroundImage5>
                                <VectorBackgroundImage6>
                                  <path d="M3.69048 0.738096H0.738096" id="Vector" stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.47619" />
                                </VectorBackgroundImage6>
                                <VectorBackgroundImage7>
                                  <path d={svgPaths.p38c28100} id="Vector" stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.47619" />
                                </VectorBackgroundImage7>
                              </div>
                            </ContainerBackgroundImage>
                          </BackgroundImage7>
                          <ReportCardBackgroundImage additionalClassNames="w-[69.766px]">
                            <p className="font-['Poppins:SemiBold',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#0ea5e9] text-[10px] text-nowrap tracking-[1px] uppercase">Quick View</p>
                          </ReportCardBackgroundImage>
                        </ContainerBackgroundImage2>
                        <div className="h-[25px] relative rounded-[10px] shrink-0 w-[93.984px]" data-name="Container" style={{ backgroundImage: "linear-gradient(165.104deg, rgba(14, 165, 233, 0.082) 0%, rgba(14, 165, 233, 0.145) 100%)" }}>
                          <div aria-hidden="true" className="absolute border border-[rgba(14,165,233,0.19)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" />
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6.946px] items-center pl-[13px] pr-px py-px relative size-full">
                            <ReportCardBackgroundImage additionalClassNames="w-[47.984px]">
                              <p className="font-['Poppins:Bold',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#0ea5e9] text-[10px] text-nowrap">Generate</p>
                            </ReportCardBackgroundImage>
                            <ContainerBackgroundImage additionalClassNames="shrink-0 size-[14px]">
                              <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                                <VectorBackgroundImage8>
                                  <path d="M0.583333 0.583333H8.75" id="Vector" stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                                </VectorBackgroundImage8>
                                <VectorBackgroundImage9>
                                  <path d={svgPaths.p1ab1aba0} id="Vector" stroke="var(--stroke-0, #0EA5E9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                                </VectorBackgroundImage9>
                              </div>
                            </ContainerBackgroundImage>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.8)]" />
                <div aria-hidden="true" className="absolute border border-[rgba(14,165,233,0.13)] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_4px_20px_0px_rgba(14,165,233,0.08),0px_2px_8px_0px_rgba(0,0,0,0.06),0px_0px_0px_1px_rgba(14,165,233,0.06)]" />
              </div>
              <div className="[grid-area:1_/_2] place-self-stretch relative rounded-[24px] shrink-0" data-name="Button" style={{ backgroundImage: "linear-gradient(155.748deg, rgba(249, 115, 22, 0.03) 0%, rgba(249, 115, 22, 0.016) 40%, rgb(255, 255, 255) 70%, rgba(249, 115, 22, 0.01) 100%)" }}>
                <div className="overflow-clip relative rounded-[inherit] size-full">
                  <div className="absolute h-[163px] left-px top-px w-[364.25px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 364.25 163\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -23.052 -51.513 0 0 0)\\'><stop stop-color=\\'rgba(249,115,22,0.082)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 364.25 163\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -23.052 -51.513 0 364.25 0)\\'><stop stop-color=\\'rgba(249,115,22,0.063)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 364.25 163\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -23.052 -51.513 0 0 163)\\'><stop stop-color=\\'rgba(249,115,22,0.03)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 364.25 163\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -23.052 -51.513 0 364.25 163)\\'><stop stop-color=\\'rgba(249,115,22,0.07)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>')" }} />
                  <div className="absolute h-[163px] left-px opacity-5 top-px w-[364.25px]" data-name="Container" style={{ backgroundImage: "linear-gradient(rgb(249, 115, 22) 0.6135%, rgba(0, 0, 0, 0) 0.6135%), linear-gradient(90deg, rgb(249, 115, 22) 0.27454%, rgba(0, 0, 0, 0) 0.27454%)" }} />
                  <div className="absolute blur-3xl filter left-[105.85px] opacity-25 rounded-[3.35544e+07px] size-[128px] top-[105.85px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 128 128\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -9.051 -9.051 0 64 64)\\\'><stop stop-color=\\\'rgba(249,115,22,0.376)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(249,115,22,0.19)\\\' offset=\\\'0.5\\\'/><stop stop-color=\\\'rgba(125,58,11,0.095)\\\' offset=\\\'0.6\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'0.7\\\'/></radialGradient></defs></svg>')" }} />
                  <div className="absolute h-[163px] left-[650.14px] top-px w-[364.25px]" data-name="Container" style={{ backgroundImage: "linear-gradient(129.123deg, rgba(0, 0, 0, 0) 41.697%, rgba(249, 115, 22, 0.082) 50%, rgba(0, 0, 0, 0) 58.303%)" }} />
                  <div className="absolute bg-gradient-to-b blur filter from-[rgba(0,0,0,0)] h-[79.178px] left-[2.87px] opacity-30 to-[rgba(249,115,22,0.25)] top-[90.58px] via-50% via-[rgba(249,115,22,0.19)] w-[360.507px]" data-name="Container" />
                  <div className="absolute h-[4px] left-px rounded-[3.35544e+07px] shadow-[0px_0px_20px_0px_rgba(249,115,22,0.38),0px_-2px_10px_0px_rgba(249,115,22,0.25)] top-[160px] w-[364.25px]" data-name="Container" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(249, 115, 22, 0.25) 20%, rgb(249, 115, 22) 50%, rgba(249, 115, 22, 0.25) 80%, rgba(0, 0, 0, 0) 100%)" }} />
                  <div className="absolute bg-[#f97316] blur-2xl filter left-[293.12px] opacity-0 rounded-[3.35544e+07px] size-[80.256px] top-[-7.13px]" data-name="Container" />
                  <div className="absolute bg-[#f97316] blur-2xl filter left-[-7.3px] opacity-0 rounded-[3.35544e+07px] size-[80.59px] top-[91.7px]" data-name="Container" />
                  <div className="absolute bg-[#f97316] left-[74.15px] opacity-[0.328] rounded-[3.35544e+07px] size-[3.383px] top-[22.97px]" data-name="Container" />
                  <div className="absolute bg-[#f97316] left-[183.64px] opacity-[0.477] rounded-[3.35544e+07px] size-[2.97px] top-[58.77px]" data-name="Container" />
                  <div className="absolute bg-[#f97316] left-[292.92px] opacity-[0.075] rounded-[3.35544e+07px] size-[2.937px] top-[70.93px]" data-name="Container" />
                  <div className="absolute content-stretch flex flex-col gap-[12px] h-[123px] items-start left-[21px] pb-[-37.625px] pt-0 px-0 top-[21px] w-[324.25px]" data-name="ReportCard">
                    <BackgroundImage4>
                      <ContainerBackgroundImage3>
                        <div aria-hidden="true" className="absolute border border-[rgba(249,115,22,0.14)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_4px_12px_0px_rgba(249,115,22,0.08)]" />
                        <BackgroundImage5>
                          <ContainerBackgroundImage additionalClassNames="size-[16.609px]">
                            <IconBackgroundImage2>
                              <path d={svgPaths.p1c62f200} id="Vector" stroke="var(--stroke-0, #F97316)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.38409" />
                            </IconBackgroundImage2>
                          </ContainerBackgroundImage>
                        </BackgroundImage5>
                        <ReportCardBackgroundImage additionalClassNames="w-[37.328px]">
                          <p className="font-['Poppins:SemiBold',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#f97316] text-[10px] text-nowrap tracking-[0.25px]">ACTIVE</p>
                        </ReportCardBackgroundImage>
                      </ContainerBackgroundImage3>
                      <div className="absolute left-0 size-[56px] top-0" data-name="Container">
                        <div className="absolute blur filter left-[-4.39px] opacity-0 rounded-[16px] size-[64.772px] top-[-4.39px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 64.772 64.772\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -4.58 -4.58 0 32.386 32.386)\\\'><stop stop-color=\\\'rgba(249,115,22,0.145)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(125,58,11,0.0725)\\\' offset=\\\'0.35\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'0.7\\\'/></radialGradient></defs></svg>')" }} />
                        <div className="absolute left-0 overflow-clip rounded-[16px] shadow-[0px_8px_24px_0px_rgba(249,115,22,0.19)] size-[56px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(249, 115, 22, 0.125) 0%, rgba(249, 115, 22, 0.208) 50%, rgba(249, 115, 22, 0.145) 100%)" }}>
                          <div className="absolute bg-gradient-to-b from-[rgba(255,255,255,0.6)] h-[28px] left-0 opacity-40 rounded-tl-[16px] rounded-tr-[16px] to-[rgba(0,0,0,0)] top-0 w-[56px]" data-name="ReportCard" />
                          <div className="absolute left-[56px] opacity-0 size-[56px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(0, 0, 0, 0) 30%, rgba(255, 255, 255, 0.6) 50%, rgba(0, 0, 0, 0) 70%)" }} />
                          <BackgroundImage6 additionalClassNames="size-[14.796px]">
                            <div className="content-stretch flex flex-col items-start opacity-0 relative size-[11.664px]" data-name="Container">
                              <IconBackgroundImage1 additionalClassNames="shadow-[0px_0px_8px_0px_#f97316]" />
                            </div>
                          </BackgroundImage6>
                          <IconBackgroundImage4>
                            <g filter="url(#filter0_d_2355_949)" id="Icon">
                              <path d={svgPaths.p556d00} id="Vector" stroke="var(--stroke-0, #F97316)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
                              <path d={svgPaths.p3f981700} id="Vector_2" stroke="var(--stroke-0, #F97316)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
                              <path d="M22.5 21.6667H27.1667" id="Vector_3" stroke="var(--stroke-0, #F97316)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
                              <path d="M22.5 27.5H27.1667" id="Vector_4" stroke="var(--stroke-0, #F97316)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
                              <path d="M17.8333 21.6667H17.845" id="Vector_5" stroke="var(--stroke-0, #F97316)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
                              <path d="M17.8333 27.5H17.845" id="Vector_6" stroke="var(--stroke-0, #F97316)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
                            </g>
                            <defs>
                              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="52" id="filter0_d_2355_949" width="52" x="-3.5" y="-1.16667">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                <feOffset dy="2" />
                                <feGaussianBlur stdDeviation="6" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_2355_949" />
                                <feBlend in="SourceGraphic" in2="effect1_dropShadow_2355_949" mode="normal" result="shape" />
                              </filter>
                            </defs>
                          </IconBackgroundImage4>
                          <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.5),inset_0px_-2px_8px_0px_rgba(249,115,22,0.13)]" />
                        </div>
                        <div className="absolute border-2 border-[#f97316] border-solid left-[-9.93px] opacity-[0.109] rounded-[16px] size-[75.87px] top-[-9.93px]" data-name="Container" />
                        <div className="absolute border-2 border-[#f97316] border-solid left-[-12.86px] opacity-[0.176] rounded-[16px] size-[81.721px] top-[-12.86px]" data-name="Container" />
                      </div>
                    </BackgroundImage4>
                    <ContainerBackgroundImage1>
                      <HeadingBackgroundImageAndText text="Pending Reading List" />
                      <ParagraphBackgroundImageAndText text="Meters awaiting reading updates" />
                    </ContainerBackgroundImage1>
                    <div className="h-[36px] relative shrink-0 w-[324.25px]" data-name="Container">
                      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(249,115,22,0.06)] border-solid inset-0 pointer-events-none" />
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-0 pt-px px-0 relative size-full">
                        <ContainerBackgroundImage2>
                          <BackgroundImage7>
                            <ContainerBackgroundImage additionalClassNames="size-[17.714px]">
                              <div className="h-[17.714px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                                <VectorBackgroundImage4>
                                  <path d={svgPaths.p12338df0} id="Vector" stroke="var(--stroke-0, #F97316)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.47619" />
                                </VectorBackgroundImage4>
                                <VectorBackgroundImage5>
                                  <path d="M0.738097 0.738097V3.69048" id="Vector" stroke="var(--stroke-0, #F97316)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.47619" />
                                </VectorBackgroundImage5>
                                <VectorBackgroundImage6>
                                  <path d="M3.69048 0.738097H0.738097" id="Vector" stroke="var(--stroke-0, #F97316)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.47619" />
                                </VectorBackgroundImage6>
                                <VectorBackgroundImage7>
                                  <path d={svgPaths.p4744400} id="Vector" stroke="var(--stroke-0, #F97316)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.47619" />
                                </VectorBackgroundImage7>
                              </div>
                            </ContainerBackgroundImage>
                          </BackgroundImage7>
                          <ReportCardBackgroundImage additionalClassNames="w-[69.766px]">
                            <p className="font-['Poppins:SemiBold',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#f97316] text-[10px] text-nowrap tracking-[1px] uppercase">Quick View</p>
                          </ReportCardBackgroundImage>
                        </ContainerBackgroundImage2>
                        <div className="h-[25px] relative rounded-[10px] shrink-0 w-[93.984px]" data-name="Container" style={{ backgroundImage: "linear-gradient(165.104deg, rgba(249, 115, 22, 0.082) 0%, rgba(249, 115, 22, 0.145) 100%)" }}>
                          <div aria-hidden="true" className="absolute border border-[rgba(249,115,22,0.19)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" />
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6.946px] items-center pl-[13px] pr-px py-px relative size-full">
                            <ReportCardBackgroundImage additionalClassNames="w-[47.984px]">
                              <p className="font-['Poppins:Bold',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#f97316] text-[10px] text-nowrap">Generate</p>
                            </ReportCardBackgroundImage>
                            <ContainerBackgroundImage additionalClassNames="shrink-0 size-[14px]">
                              <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                                <VectorBackgroundImage8>
                                  <path d="M0.583333 0.583333H8.75" id="Vector" stroke="var(--stroke-0, #F97316)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                                </VectorBackgroundImage8>
                                <VectorBackgroundImage9>
                                  <path d={svgPaths.p1ab1aba0} id="Vector" stroke="var(--stroke-0, #F97316)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                                </VectorBackgroundImage9>
                              </div>
                            </ContainerBackgroundImage>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.8)]" />
                <div aria-hidden="true" className="absolute border border-[rgba(249,115,22,0.13)] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_4px_20px_0px_rgba(249,115,22,0.08),0px_2px_8px_0px_rgba(0,0,0,0.06),0px_0px_0px_1px_rgba(249,115,22,0.06)]" />
              </div>
              <div className="[grid-area:1_/_3] place-self-stretch relative rounded-[24px] shrink-0" data-name="Button" style={{ backgroundImage: "linear-gradient(155.748deg, rgba(6, 182, 212, 0.03) 0%, rgba(6, 182, 212, 0.016) 40%, rgb(255, 255, 255) 70%, rgba(6, 182, 212, 0.01) 100%)" }}>
                <div className="overflow-clip relative rounded-[inherit] size-full">
                  <div className="absolute h-[163px] left-px top-px w-[364.25px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 364.25 163\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -23.052 -51.513 0 0 0)\\'><stop stop-color=\\'rgba(6,182,212,0.082)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 364.25 163\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -23.052 -51.513 0 364.25 0)\\'><stop stop-color=\\'rgba(6,182,212,0.063)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 364.25 163\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -23.052 -51.513 0 0 163)\\'><stop stop-color=\\'rgba(6,182,212,0.03)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 364.25 163\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -23.052 -51.513 0 364.25 163)\\'><stop stop-color=\\'rgba(6,182,212,0.07)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>')" }} />
                  <div className="absolute h-[163px] left-px opacity-5 top-px w-[364.25px]" data-name="Container" style={{ backgroundImage: "linear-gradient(rgb(6, 182, 212) 0.6135%, rgba(0, 0, 0, 0) 0.6135%), linear-gradient(90deg, rgb(6, 182, 212) 0.27454%, rgba(0, 0, 0, 0) 0.27454%)" }} />
                  <div className="absolute blur-3xl filter left-[105.85px] opacity-25 rounded-[3.35544e+07px] size-[128px] top-[105.85px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 128 128\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -9.051 -9.051 0 64 64)\\\'><stop stop-color=\\\'rgba(6,182,212,0.376)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(6,182,212,0.19)\\\' offset=\\\'0.5\\\'/><stop stop-color=\\\'rgba(3,91,106,0.095)\\\' offset=\\\'0.6\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'0.7\\\'/></radialGradient></defs></svg>')" }} />
                  <div className="absolute h-[163px] left-[650.14px] top-px w-[364.25px]" data-name="Container" style={{ backgroundImage: "linear-gradient(129.123deg, rgba(0, 0, 0, 0) 41.697%, rgba(6, 182, 212, 0.082) 50%, rgba(0, 0, 0, 0) 58.303%)" }} />
                  <div className="absolute bg-gradient-to-b blur filter from-[rgba(0,0,0,0)] h-[79.178px] left-[2.87px] opacity-30 to-[rgba(6,182,212,0.25)] top-[90.58px] via-50% via-[rgba(6,182,212,0.19)] w-[360.507px]" data-name="Container" />
                  <div className="absolute h-[4px] left-px rounded-[3.35544e+07px] shadow-[0px_0px_20px_0px_rgba(6,182,212,0.38),0px_-2px_10px_0px_rgba(6,182,212,0.25)] top-[160px] w-[364.25px]" data-name="Container" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(6, 182, 212, 0.25) 20%, rgb(6, 182, 212) 50%, rgba(6, 182, 212, 0.25) 80%, rgba(0, 0, 0, 0) 100%)" }} />
                  <div className="absolute bg-[#06b6d4] blur-2xl filter left-[293.12px] opacity-0 rounded-[3.35544e+07px] size-[80.256px] top-[-7.13px]" data-name="Container" />
                  <div className="absolute bg-[#06b6d4] blur-2xl filter left-[-7.3px] opacity-0 rounded-[3.35544e+07px] size-[80.59px] top-[91.7px]" data-name="Container" />
                  <div className="absolute bg-[#06b6d4] left-[74.15px] opacity-[0.328] rounded-[3.35544e+07px] size-[3.383px] top-[22.97px]" data-name="Container" />
                  <div className="absolute bg-[#06b6d4] left-[183.64px] opacity-[0.477] rounded-[3.35544e+07px] size-[2.97px] top-[58.77px]" data-name="Container" />
                  <div className="absolute bg-[#06b6d4] left-[292.92px] opacity-[0.075] rounded-[3.35544e+07px] size-[2.937px] top-[70.93px]" data-name="Container" />
                  <div className="absolute content-stretch flex flex-col gap-[12px] h-[123px] items-start left-[21px] pb-[-37.625px] pt-0 px-0 top-[21px] w-[324.25px]" data-name="ReportCard">
                    <BackgroundImage4>
                      <ContainerBackgroundImage3>
                        <div aria-hidden="true" className="absolute border border-[rgba(6,182,212,0.14)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_4px_12px_0px_rgba(6,182,212,0.08)]" />
                        <BackgroundImage5>
                          <ContainerBackgroundImage additionalClassNames="size-[16.609px]">
                            <IconBackgroundImage2>
                              <path d={svgPaths.p1c62f200} id="Vector" stroke="var(--stroke-0, #06B6D4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.38409" />
                            </IconBackgroundImage2>
                          </ContainerBackgroundImage>
                        </BackgroundImage5>
                        <ReportCardBackgroundImage additionalClassNames="w-[37.328px]">
                          <p className="font-['Poppins:SemiBold',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#06b6d4] text-[10px] text-nowrap tracking-[0.25px]">ACTIVE</p>
                        </ReportCardBackgroundImage>
                      </ContainerBackgroundImage3>
                      <div className="absolute left-0 size-[56px] top-0" data-name="Container">
                        <div className="absolute blur filter h-[64.772px] left-[-4.39px] opacity-0 rounded-[16px] top-[-4.39px] w-[64.771px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 64.771 64.772\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -4.58 -4.58 0 32.386 32.386)\\\'><stop stop-color=\\\'rgba(6,182,212,0.145)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(3,91,106,0.0725)\\\' offset=\\\'0.35\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'0.7\\\'/></radialGradient></defs></svg>')" }} />
                        <div className="absolute left-0 overflow-clip rounded-[16px] shadow-[0px_8px_24px_0px_rgba(6,182,212,0.19)] size-[56px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(6, 182, 212, 0.125) 0%, rgba(6, 182, 212, 0.208) 50%, rgba(6, 182, 212, 0.145) 100%)" }}>
                          <div className="absolute bg-gradient-to-b from-[rgba(255,255,255,0.6)] h-[28px] left-0 opacity-40 rounded-tl-[16px] rounded-tr-[16px] to-[rgba(0,0,0,0)] top-0 w-[56px]" data-name="ReportCard" />
                          <div className="absolute left-[56px] opacity-0 size-[56px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(0, 0, 0, 0) 30%, rgba(255, 255, 255, 0.6) 50%, rgba(0, 0, 0, 0) 70%)" }} />
                          <BackgroundImage6 additionalClassNames="size-[14.796px]">
                            <div className="content-stretch flex flex-col items-start opacity-0 relative size-[11.664px]" data-name="Container">
                              <IconBackgroundImage1 additionalClassNames="shadow-[0px_0px_8px_0px_#06b6d4]" />
                            </div>
                          </BackgroundImage6>
                          <IconBackgroundImage4>
                            <g filter="url(#filter0_d_2355_916)" id="Icon">
                              <path d={svgPaths.p121f7580} id="Vector" stroke="var(--stroke-0, #06B6D4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
                              <path d={svgPaths.p3a467400} id="Vector_2" stroke="var(--stroke-0, #06B6D4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
                              <path d="M17.8333 29.8333V27.5" id="Vector_3" stroke="var(--stroke-0, #06B6D4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
                              <path d="M22.5 29.8333V25.1667" id="Vector_4" stroke="var(--stroke-0, #06B6D4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
                              <path d="M27.1667 29.8333V22.8333" id="Vector_5" stroke="var(--stroke-0, #06B6D4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
                            </g>
                            <defs>
                              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="52" id="filter0_d_2355_916" width="52" x="-3.5" y="-1.16667">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                <feOffset dy="2" />
                                <feGaussianBlur stdDeviation="6" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_2355_916" />
                                <feBlend in="SourceGraphic" in2="effect1_dropShadow_2355_916" mode="normal" result="shape" />
                              </filter>
                            </defs>
                          </IconBackgroundImage4>
                          <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.5),inset_0px_-2px_8px_0px_rgba(6,182,212,0.13)]" />
                        </div>
                        <div className="absolute border-2 border-[#06b6d4] border-solid left-[-9.93px] opacity-[0.109] rounded-[16px] size-[75.87px] top-[-9.93px]" data-name="Container" />
                        <div className="absolute border-2 border-[#06b6d4] border-solid left-[-12.86px] opacity-[0.176] rounded-[16px] size-[81.721px] top-[-12.86px]" data-name="Container" />
                      </div>
                    </BackgroundImage4>
                    <ContainerBackgroundImage1>
                      <HeadingBackgroundImageAndText text="Reading Summary Report" />
                      <ParagraphBackgroundImageAndText text="Comprehensive meter reading analysis" />
                    </ContainerBackgroundImage1>
                    <div className="h-[36px] relative shrink-0 w-[324.25px]" data-name="Container">
                      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(6,182,212,0.06)] border-solid inset-0 pointer-events-none" />
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-0 pt-px px-0 relative size-full">
                        <ContainerBackgroundImage2>
                          <BackgroundImage7>
                            <ContainerBackgroundImage additionalClassNames="size-[17.714px]">
                              <div className="h-[17.714px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                                <VectorBackgroundImage4>
                                  <path d={svgPaths.pea8d200} id="Vector" stroke="var(--stroke-0, #06B6D4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4762" />
                                </VectorBackgroundImage4>
                                <VectorBackgroundImage5>
                                  <path d="M0.738098 0.738098V3.69049" id="Vector" stroke="var(--stroke-0, #06B6D4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4762" />
                                </VectorBackgroundImage5>
                                <VectorBackgroundImage6>
                                  <path d="M3.69049 0.738098H0.738098" id="Vector" stroke="var(--stroke-0, #06B6D4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4762" />
                                </VectorBackgroundImage6>
                                <VectorBackgroundImage7>
                                  <path d={svgPaths.p1141a100} id="Vector" stroke="var(--stroke-0, #06B6D4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4762" />
                                </VectorBackgroundImage7>
                              </div>
                            </ContainerBackgroundImage>
                          </BackgroundImage7>
                          <ReportCardBackgroundImage additionalClassNames="w-[69.766px]">
                            <p className="font-['Poppins:SemiBold',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#06b6d4] text-[10px] text-nowrap tracking-[1px] uppercase">Quick View</p>
                          </ReportCardBackgroundImage>
                        </ContainerBackgroundImage2>
                        <div className="h-[25px] relative rounded-[10px] shrink-0 w-[93.984px]" data-name="Container" style={{ backgroundImage: "linear-gradient(165.104deg, rgba(6, 182, 212, 0.082) 0%, rgba(6, 182, 212, 0.145) 100%)" }}>
                          <div aria-hidden="true" className="absolute border border-[rgba(6,182,212,0.19)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" />
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6.946px] items-center pl-[13px] pr-px py-px relative size-full">
                            <ReportCardBackgroundImage additionalClassNames="w-[47.984px]">
                              <p className="font-['Poppins:Bold',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#06b6d4] text-[10px] text-nowrap">Generate</p>
                            </ReportCardBackgroundImage>
                            <ContainerBackgroundImage additionalClassNames="shrink-0 size-[14px]">
                              <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                                <VectorBackgroundImage8>
                                  <path d="M0.583333 0.583333H8.75" id="Vector" stroke="var(--stroke-0, #06B6D4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                                </VectorBackgroundImage8>
                                <VectorBackgroundImage9>
                                  <path d={svgPaths.p1ab1aba0} id="Vector" stroke="var(--stroke-0, #06B6D4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                                </VectorBackgroundImage9>
                              </div>
                            </ContainerBackgroundImage>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.8)]" />
                <div aria-hidden="true" className="absolute border border-[rgba(6,182,212,0.13)] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_4px_20px_0px_rgba(6,182,212,0.08),0px_2px_8px_0px_rgba(0,0,0,0.06),0px_0px_0px_1px_rgba(6,182,212,0.06)]" />
              </div>
              <div className="[grid-area:1_/_4] place-self-stretch relative rounded-[24px] shrink-0" data-name="Button" style={{ backgroundImage: "linear-gradient(155.748deg, rgba(124, 58, 237, 0.03) 0%, rgba(124, 58, 237, 0.016) 40%, rgb(255, 255, 255) 70%, rgba(124, 58, 237, 0.01) 100%)" }}>
                <div className="overflow-clip relative rounded-[inherit] size-full">
                  <div className="absolute h-[163px] left-px top-px w-[364.25px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 364.25 163\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -23.052 -51.513 0 0 0)\\'><stop stop-color=\\'rgba(124,58,237,0.082)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 364.25 163\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -23.052 -51.513 0 364.25 0)\\'><stop stop-color=\\'rgba(124,58,237,0.063)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 364.25 163\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -23.052 -51.513 0 0 163)\\'><stop stop-color=\\'rgba(124,58,237,0.03)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 364.25 163\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -23.052 -51.513 0 364.25 163)\\'><stop stop-color=\\'rgba(124,58,237,0.07)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>')" }} />
                  <div className="absolute h-[163px] left-px opacity-5 top-px w-[364.25px]" data-name="Container" style={{ backgroundImage: "linear-gradient(rgb(124, 58, 237) 0.6135%, rgba(0, 0, 0, 0) 0.6135%), linear-gradient(90deg, rgb(124, 58, 237) 0.27454%, rgba(0, 0, 0, 0) 0.27454%)" }} />
                  <div className="absolute blur-3xl filter left-[105.85px] opacity-25 rounded-[3.35544e+07px] size-[128px] top-[105.85px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 128 128\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -9.051 -9.051 0 64 64)\\\'><stop stop-color=\\\'rgba(124,58,237,0.376)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(124,58,237,0.19)\\\' offset=\\\'0.5\\\'/><stop stop-color=\\\'rgba(62,29,119,0.095)\\\' offset=\\\'0.6\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'0.7\\\'/></radialGradient></defs></svg>')" }} />
                  <div className="absolute h-[163px] left-[650.14px] top-px w-[364.25px]" data-name="Container" style={{ backgroundImage: "linear-gradient(129.123deg, rgba(0, 0, 0, 0) 41.697%, rgba(124, 58, 237, 0.082) 50%, rgba(0, 0, 0, 0) 58.303%)" }} />
                  <div className="absolute bg-gradient-to-b blur filter from-[rgba(0,0,0,0)] h-[79.178px] left-[2.87px] opacity-30 to-[rgba(124,58,237,0.25)] top-[90.58px] via-50% via-[rgba(124,58,237,0.19)] w-[360.507px]" data-name="Container" />
                  <div className="absolute h-[4px] left-px rounded-[3.35544e+07px] shadow-[0px_0px_20px_0px_rgba(124,58,237,0.38),0px_-2px_10px_0px_rgba(124,58,237,0.25)] top-[160px] w-[364.25px]" data-name="Container" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(124, 58, 237, 0.25) 20%, rgb(124, 58, 237) 50%, rgba(124, 58, 237, 0.25) 80%, rgba(0, 0, 0, 0) 100%)" }} />
                  <div className="absolute bg-[#7c3aed] blur-2xl filter left-[293.12px] opacity-0 rounded-[3.35544e+07px] size-[80.256px] top-[-7.13px]" data-name="Container" />
                  <div className="absolute bg-[#7c3aed] blur-2xl filter h-[80.59px] left-[-7.3px] opacity-0 rounded-[3.35544e+07px] top-[91.7px] w-[80.591px]" data-name="Container" />
                  <div className="absolute bg-[#7c3aed] left-[74.15px] opacity-[0.328] rounded-[3.35544e+07px] size-[3.383px] top-[22.97px]" data-name="Container" />
                  <div className="absolute bg-[#7c3aed] left-[183.64px] opacity-[0.477] rounded-[3.35544e+07px] size-[2.97px] top-[58.77px]" data-name="Container" />
                  <div className="absolute bg-[#7c3aed] left-[292.92px] opacity-[0.075] rounded-[3.35544e+07px] size-[2.937px] top-[70.93px]" data-name="Container" />
                  <div className="absolute content-stretch flex flex-col gap-[12px] h-[123px] items-start left-[21px] pb-[-37.625px] pt-0 px-0 top-[21px] w-[324.25px]" data-name="ReportCard">
                    <BackgroundImage4>
                      <ContainerBackgroundImage3>
                        <div aria-hidden="true" className="absolute border border-[rgba(124,58,237,0.14)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_4px_12px_0px_rgba(124,58,237,0.08)]" />
                        <BackgroundImage5>
                          <ContainerBackgroundImage additionalClassNames="size-[16.609px]">
                            <IconBackgroundImage2>
                              <path d={svgPaths.p1c62f200} id="Vector" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.38409" />
                            </IconBackgroundImage2>
                          </ContainerBackgroundImage>
                        </BackgroundImage5>
                        <ReportCardBackgroundImage additionalClassNames="w-[37.328px]">
                          <p className="font-['Poppins:SemiBold',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#7c3aed] text-[10px] text-nowrap tracking-[0.25px]">ACTIVE</p>
                        </ReportCardBackgroundImage>
                      </ContainerBackgroundImage3>
                      <div className="absolute left-0 size-[56px] top-0" data-name="Container">
                        <div className="absolute blur filter h-[64.772px] left-[-4.39px] opacity-0 rounded-[16px] top-[-4.39px] w-[64.771px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 64.771 64.772\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -4.58 -4.58 0 32.386 32.386)\\\'><stop stop-color=\\\'rgba(124,58,237,0.145)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(62,29,119,0.0725)\\\' offset=\\\'0.35\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'0.7\\\'/></radialGradient></defs></svg>')" }} />
                        <div className="absolute left-0 overflow-clip rounded-[16px] shadow-[0px_8px_24px_0px_rgba(124,58,237,0.19)] size-[56px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(124, 58, 237, 0.125) 0%, rgba(124, 58, 237, 0.208) 50%, rgba(124, 58, 237, 0.145) 100%)" }}>
                          <div className="absolute bg-gradient-to-b from-[rgba(255,255,255,0.6)] h-[28px] left-0 opacity-40 rounded-tl-[16px] rounded-tr-[16px] to-[rgba(0,0,0,0)] top-0 w-[56px]" data-name="ReportCard" />
                          <div className="absolute left-[56px] opacity-0 size-[56px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(0, 0, 0, 0) 30%, rgba(255, 255, 255, 0.6) 50%, rgba(0, 0, 0, 0) 70%)" }} />
                          <BackgroundImage6 additionalClassNames="h-[14.795px] w-[14.796px]">
                            <div className="content-stretch flex flex-col items-start opacity-0 relative size-[11.664px]" data-name="Container">
                              <div className="h-[11.664px] overflow-clip relative shadow-[0px_0px_8px_0px_#7c3aed] shrink-0 w-full" data-name="Icon">
                                <VectorBackgroundImage>
                                  <path d={svgPaths.p26dd51b0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.971985" />
                                </VectorBackgroundImage>
                                <VectorBackgroundImage1>
                                  <path d="M0.485992 0.485992V2.42996" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.971985" />
                                </VectorBackgroundImage1>
                                <VectorBackgroundImage2>
                                  <path d="M2.42996 0.485992H0.485992" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.971985" />
                                </VectorBackgroundImage2>
                                <VectorBackgroundImage3>
                                  <path d={svgPaths.p37174b00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.971985" />
                                </VectorBackgroundImage3>
                              </div>
                            </div>
                          </BackgroundImage6>
                          <div className="absolute left-[14px] size-[28px] top-[14px]" data-name="Icon">
                            <BackgroundImage2 additionalClassNames="inset-[-31.55%_-30.36%_-45.85%_-30.36%]">
                              <g filter="url(#filter0_d_2355_972)" id="Icon">
                                <path d={svgPaths.p225dd1e0} id="Vector" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
                              </g>
                              <defs>
                                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="52" id="filter0_d_2355_972" width="52" x="-3.5" y="-1.16613">
                                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                  <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                  <feOffset dy="2" />
                                  <feGaussianBlur stdDeviation="6" />
                                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                                  <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_2355_972" />
                                  <feBlend in="SourceGraphic" in2="effect1_dropShadow_2355_972" mode="normal" result="shape" />
                                </filter>
                              </defs>
                            </BackgroundImage2>
                          </div>
                          <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.5),inset_0px_-2px_8px_0px_rgba(124,58,237,0.13)]" />
                        </div>
                        <div className="absolute border-2 border-[#7c3aed] border-solid left-[-9.93px] opacity-[0.109] rounded-[16px] size-[75.87px] top-[-9.93px]" data-name="Container" />
                        <div className="absolute border-2 border-[#7c3aed] border-solid left-[-12.86px] opacity-[0.176] rounded-[16px] size-[81.721px] top-[-12.86px]" data-name="Container" />
                      </div>
                    </BackgroundImage4>
                    <ContainerBackgroundImage1>
                      <HeadingBackgroundImageAndText text="Connection Seal Report" />
                      <BackgroundImage>{`Seal verification & tampering detection`}</BackgroundImage>
                    </ContainerBackgroundImage1>
                    <div className="h-[36px] relative shrink-0 w-[324.25px]" data-name="Container">
                      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(124,58,237,0.06)] border-solid inset-0 pointer-events-none" />
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-0 pt-px px-0 relative size-full">
                        <ContainerBackgroundImage2>
                          <BackgroundImage7>
                            <ContainerBackgroundImage additionalClassNames="size-[17.714px]">
                              <div className="h-[17.714px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                                <VectorBackgroundImage4>
                                  <path d={svgPaths.pea8d200} id="Vector" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4762" />
                                </VectorBackgroundImage4>
                                <VectorBackgroundImage5>
                                  <path d="M0.738098 0.738098V3.69049" id="Vector" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4762" />
                                </VectorBackgroundImage5>
                                <VectorBackgroundImage6>
                                  <path d="M3.69049 0.738098H0.738098" id="Vector" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4762" />
                                </VectorBackgroundImage6>
                                <VectorBackgroundImage7>
                                  <path d={svgPaths.p1141a100} id="Vector" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4762" />
                                </VectorBackgroundImage7>
                              </div>
                            </ContainerBackgroundImage>
                          </BackgroundImage7>
                          <ReportCardBackgroundImage additionalClassNames="w-[69.766px]">
                            <p className="font-['Poppins:SemiBold',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#7c3aed] text-[10px] text-nowrap tracking-[1px] uppercase">Quick View</p>
                          </ReportCardBackgroundImage>
                        </ContainerBackgroundImage2>
                        <div className="h-[25px] relative rounded-[10px] shrink-0 w-[93.984px]" data-name="Container" style={{ backgroundImage: "linear-gradient(165.104deg, rgba(124, 58, 237, 0.082) 0%, rgba(124, 58, 237, 0.145) 100%)" }}>
                          <div aria-hidden="true" className="absolute border border-[rgba(124,58,237,0.19)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" />
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6.946px] items-center pl-[13px] pr-px py-px relative size-full">
                            <ReportCardBackgroundImage additionalClassNames="w-[47.984px]">
                              <p className="font-['Poppins:Bold',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#7c3aed] text-[10px] text-nowrap">Generate</p>
                            </ReportCardBackgroundImage>
                            <ContainerBackgroundImage additionalClassNames="shrink-0 size-[14px]">
                              <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                                <VectorBackgroundImage8>
                                  <path d="M0.583333 0.583333H8.75" id="Vector" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                                </VectorBackgroundImage8>
                                <VectorBackgroundImage9>
                                  <path d={svgPaths.p1ab1aba0} id="Vector" stroke="var(--stroke-0, #7C3AED)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                                </VectorBackgroundImage9>
                              </div>
                            </ContainerBackgroundImage>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.8)]" />
                <div aria-hidden="true" className="absolute border border-[rgba(124,58,237,0.13)] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_4px_20px_0px_rgba(124,58,237,0.08),0px_2px_8px_0px_rgba(0,0,0,0.06),0px_0px_0px_1px_rgba(124,58,237,0.06)]" />
              </div>
              <div className="[grid-area:2_/_1] place-self-stretch relative rounded-[24px] shrink-0" data-name="Button" style={{ backgroundImage: "linear-gradient(155.748deg, rgba(16, 185, 129, 0.03) 0%, rgba(16, 185, 129, 0.016) 40%, rgb(255, 255, 255) 70%, rgba(16, 185, 129, 0.01) 100%)" }}>
                <div className="overflow-clip relative rounded-[inherit] size-full">
                  <div className="absolute h-[163px] left-px top-px w-[364.25px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 364.25 163\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -23.052 -51.513 0 0 0)\\'><stop stop-color=\\'rgba(16,185,129,0.082)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 364.25 163\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -23.052 -51.513 0 364.25 0)\\'><stop stop-color=\\'rgba(16,185,129,0.063)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 364.25 163\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -23.052 -51.513 0 0 163)\\'><stop stop-color=\\'rgba(16,185,129,0.03)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 364.25 163\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -23.052 -51.513 0 364.25 163)\\'><stop stop-color=\\'rgba(16,185,129,0.07)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>')" }} />
                  <div className="absolute h-[163px] left-px opacity-5 top-px w-[364.25px]" data-name="Container" style={{ backgroundImage: "linear-gradient(rgb(16, 185, 129) 0.6135%, rgba(0, 0, 0, 0) 0.6135%), linear-gradient(90deg, rgb(16, 185, 129) 0.27454%, rgba(0, 0, 0, 0) 0.27454%)" }} />
                  <div className="absolute blur-3xl filter left-[105.85px] opacity-25 rounded-[3.35544e+07px] size-[128px] top-[105.85px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 128 128\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -9.051 -9.051 0 64 64)\\\'><stop stop-color=\\\'rgba(16,185,129,0.376)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(16,185,129,0.19)\\\' offset=\\\'0.5\\\'/><stop stop-color=\\\'rgba(8,93,65,0.095)\\\' offset=\\\'0.6\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'0.7\\\'/></radialGradient></defs></svg>')" }} />
                  <div className="absolute h-[163px] left-[650.14px] top-px w-[364.25px]" data-name="Container" style={{ backgroundImage: "linear-gradient(129.123deg, rgba(0, 0, 0, 0) 41.697%, rgba(16, 185, 129, 0.082) 50%, rgba(0, 0, 0, 0) 58.303%)" }} />
                  <div className="absolute bg-gradient-to-b blur filter from-[rgba(0,0,0,0)] h-[79.178px] left-[2.87px] opacity-30 to-[rgba(16,185,129,0.25)] top-[90.58px] via-50% via-[rgba(16,185,129,0.19)] w-[360.507px]" data-name="Container" />
                  <div className="absolute h-[4px] left-px rounded-[3.35544e+07px] shadow-[0px_0px_20px_0px_rgba(16,185,129,0.38),0px_-2px_10px_0px_rgba(16,185,129,0.25)] top-[160px] w-[364.25px]" data-name="Container" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(16, 185, 129, 0.25) 20%, rgb(16, 185, 129) 50%, rgba(16, 185, 129, 0.25) 80%, rgba(0, 0, 0, 0) 100%)" }} />
                  <div className="absolute bg-[#10b981] blur-2xl filter left-[293.12px] opacity-0 rounded-[3.35544e+07px] size-[80.256px] top-[-7.13px]" data-name="Container" />
                  <div className="absolute bg-[#10b981] blur-2xl filter left-[-7.3px] opacity-0 rounded-[3.35544e+07px] size-[80.59px] top-[91.7px]" data-name="Container" />
                  <div className="absolute bg-[#10b981] left-[74.15px] opacity-[0.328] rounded-[3.35544e+07px] size-[3.383px] top-[22.97px]" data-name="Container" />
                  <div className="absolute bg-[#10b981] left-[183.64px] opacity-[0.477] rounded-[3.35544e+07px] size-[2.97px] top-[58.77px]" data-name="Container" />
                  <div className="absolute bg-[#10b981] left-[292.92px] opacity-[0.075] rounded-[3.35544e+07px] size-[2.937px] top-[70.93px]" data-name="Container" />
                  <div className="absolute content-stretch flex flex-col gap-[12px] h-[123px] items-start left-[21px] pb-[-37.625px] pt-0 px-0 top-[21px] w-[324.25px]" data-name="ReportCard">
                    <BackgroundImage4>
                      <ContainerBackgroundImage3>
                        <div aria-hidden="true" className="absolute border border-[rgba(16,185,129,0.14)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_4px_12px_0px_rgba(16,185,129,0.08)]" />
                        <BackgroundImage5>
                          <ContainerBackgroundImage additionalClassNames="size-[16.609px]">
                            <IconBackgroundImage2>
                              <path d={svgPaths.p1c62f200} id="Vector" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.38409" />
                            </IconBackgroundImage2>
                          </ContainerBackgroundImage>
                        </BackgroundImage5>
                        <ReportCardBackgroundImage additionalClassNames="w-[37.328px]">
                          <p className="font-['Poppins:SemiBold',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#10b981] text-[10px] text-nowrap tracking-[0.25px]">ACTIVE</p>
                        </ReportCardBackgroundImage>
                      </ContainerBackgroundImage3>
                      <div className="absolute left-0 size-[56px] top-0" data-name="Container">
                        <div className="absolute blur filter h-[64.771px] left-[-4.39px] opacity-0 rounded-[16px] top-[-4.39px] w-[64.772px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 64.772 64.771\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -4.58 -4.58 0 32.386 32.386)\\\'><stop stop-color=\\\'rgba(16,185,129,0.145)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'0.7\\\'/></radialGradient></defs></svg>')" }} />
                        <div className="absolute left-0 overflow-clip rounded-[16px] shadow-[0px_8px_24px_0px_rgba(16,185,129,0.19)] size-[56px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(16, 185, 129, 0.125) 0%, rgba(16, 185, 129, 0.208) 50%, rgba(16, 185, 129, 0.145) 100%)" }}>
                          <div className="absolute bg-gradient-to-b from-[rgba(255,255,255,0.6)] h-[28px] left-0 opacity-40 rounded-tl-[16px] rounded-tr-[16px] to-[rgba(0,0,0,0)] top-0 w-[56px]" data-name="ReportCard" />
                          <div className="absolute left-[56px] opacity-0 size-[56px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(0, 0, 0, 0) 30%, rgba(255, 255, 255, 0.6) 50%, rgba(0, 0, 0, 0) 70%)" }} />
                          <BackgroundImage6 additionalClassNames="size-[14.796px]">
                            <div className="content-stretch flex flex-col items-start opacity-0 relative size-[11.664px]" data-name="Container">
                              <IconBackgroundImage1 additionalClassNames="shadow-[0px_0px_8px_0px_#10b981]" />
                            </div>
                          </BackgroundImage6>
                          <IconBackgroundImage5>
                            <g filter="url(#filter0_d_2355_995)" id="Icon">
                              <path d={svgPaths.p298da200} id="Vector" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
                              <path d={svgPaths.pcf23980} id="Vector_2" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
                              <path d="M33 17V24" id="Vector_3" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
                              <path d="M36.5 20.5H29.5" id="Vector_4" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
                            </g>
                            <defs>
                              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="52" id="filter0_d_2355_995" width="52" x="-1.16667" y="-2.33333">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                <feOffset dy="2" />
                                <feGaussianBlur stdDeviation="6" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_2355_995" />
                                <feBlend in="SourceGraphic" in2="effect1_dropShadow_2355_995" mode="normal" result="shape" />
                              </filter>
                            </defs>
                          </IconBackgroundImage5>
                          <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.5),inset_0px_-2px_8px_0px_rgba(16,185,129,0.13)]" />
                        </div>
                        <div className="absolute border-2 border-[#10b981] border-solid left-[-9.93px] opacity-[0.109] rounded-[16px] size-[75.87px] top-[-9.93px]" data-name="Container" />
                        <div className="absolute border-2 border-[#10b981] border-solid left-[-12.86px] opacity-[0.176] rounded-[16px] size-[81.721px] top-[-12.86px]" data-name="Container" />
                      </div>
                    </BackgroundImage4>
                    <ContainerBackgroundImage1>
                      <HeadingBackgroundImageAndText text="New Connection List" />
                      <ParagraphBackgroundImageAndText text="Recently added water connections" />
                    </ContainerBackgroundImage1>
                    <div className="h-[36px] relative shrink-0 w-[324.25px]" data-name="Container">
                      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(16,185,129,0.06)] border-solid inset-0 pointer-events-none" />
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-0 pt-px px-0 relative size-full">
                        <ContainerBackgroundImage2>
                          <BackgroundImage7>
                            <ContainerBackgroundImage additionalClassNames="size-[17.714px]">
                              <div className="h-[17.714px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                                <VectorBackgroundImage4>
                                  <path d={svgPaths.p20c7f880} id="Vector" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.47619" />
                                </VectorBackgroundImage4>
                                <VectorBackgroundImage5>
                                  <path d="M0.738096 0.738096V3.69048" id="Vector" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.47619" />
                                </VectorBackgroundImage5>
                                <VectorBackgroundImage6>
                                  <path d="M3.69048 0.738096H0.738096" id="Vector" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.47619" />
                                </VectorBackgroundImage6>
                                <VectorBackgroundImage7>
                                  <path d={svgPaths.p38c28100} id="Vector" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.47619" />
                                </VectorBackgroundImage7>
                              </div>
                            </ContainerBackgroundImage>
                          </BackgroundImage7>
                          <ReportCardBackgroundImage additionalClassNames="w-[69.766px]">
                            <p className="font-['Poppins:SemiBold',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#10b981] text-[10px] text-nowrap tracking-[1px] uppercase">Quick View</p>
                          </ReportCardBackgroundImage>
                        </ContainerBackgroundImage2>
                        <div className="h-[25px] relative rounded-[10px] shrink-0 w-[93.984px]" data-name="Container" style={{ backgroundImage: "linear-gradient(165.104deg, rgba(16, 185, 129, 0.082) 0%, rgba(16, 185, 129, 0.145) 100%)" }}>
                          <div aria-hidden="true" className="absolute border border-[rgba(16,185,129,0.19)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" />
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6.946px] items-center pl-[13px] pr-px py-px relative size-full">
                            <ReportCardBackgroundImage additionalClassNames="w-[47.984px]">
                              <p className="font-['Poppins:Bold',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#10b981] text-[10px] text-nowrap">Generate</p>
                            </ReportCardBackgroundImage>
                            <ContainerBackgroundImage additionalClassNames="shrink-0 size-[14px]">
                              <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                                <VectorBackgroundImage8>
                                  <path d="M0.583333 0.583333H8.75" id="Vector" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                                </VectorBackgroundImage8>
                                <VectorBackgroundImage9>
                                  <path d={svgPaths.p1ab1aba0} id="Vector" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                                </VectorBackgroundImage9>
                              </div>
                            </ContainerBackgroundImage>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.8)]" />
                <div aria-hidden="true" className="absolute border border-[rgba(16,185,129,0.13)] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_4px_20px_0px_rgba(16,185,129,0.08),0px_2px_8px_0px_rgba(0,0,0,0.06),0px_0px_0px_1px_rgba(16,185,129,0.06)]" />
              </div>
              <div className="[grid-area:2_/_2] place-self-stretch relative rounded-[24px] shrink-0" data-name="Button" style={{ backgroundImage: "linear-gradient(155.748deg, rgba(139, 92, 246, 0.03) 0%, rgba(139, 92, 246, 0.016) 40%, rgb(255, 255, 255) 70%, rgba(139, 92, 246, 0.01) 100%)" }}>
                <div className="overflow-clip relative rounded-[inherit] size-full">
                  <div className="absolute h-[163px] left-px top-px w-[364.25px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 364.25 163\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -23.052 -51.513 0 0 0)\\'><stop stop-color=\\'rgba(139,92,246,0.082)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 364.25 163\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -23.052 -51.513 0 364.25 0)\\'><stop stop-color=\\'rgba(139,92,246,0.063)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 364.25 163\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -23.052 -51.513 0 0 163)\\'><stop stop-color=\\'rgba(139,92,246,0.03)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 364.25 163\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -23.052 -51.513 0 364.25 163)\\'><stop stop-color=\\'rgba(139,92,246,0.07)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>')" }} />
                  <div className="absolute h-[163px] left-px opacity-5 top-px w-[364.25px]" data-name="Container" style={{ backgroundImage: "linear-gradient(rgb(139, 92, 246) 0.6135%, rgba(0, 0, 0, 0) 0.6135%), linear-gradient(90deg, rgb(139, 92, 246) 0.27454%, rgba(0, 0, 0, 0) 0.27454%)" }} />
                  <div className="absolute blur-3xl filter left-[105.85px] opacity-25 rounded-[3.35544e+07px] size-[128px] top-[105.85px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 128 128\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -9.051 -9.051 0 64 64)\\\'><stop stop-color=\\\'rgba(139,92,246,0.376)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(139,92,246,0.19)\\\' offset=\\\'0.5\\\'/><stop stop-color=\\\'rgba(70,46,123,0.095)\\\' offset=\\\'0.6\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'0.7\\\'/></radialGradient></defs></svg>')" }} />
                  <div className="absolute h-[163px] left-[650.14px] top-px w-[364.25px]" data-name="Container" style={{ backgroundImage: "linear-gradient(129.123deg, rgba(0, 0, 0, 0) 41.697%, rgba(139, 92, 246, 0.082) 50%, rgba(0, 0, 0, 0) 58.303%)" }} />
                  <div className="absolute bg-gradient-to-b blur filter from-[rgba(0,0,0,0)] h-[79.178px] left-[2.87px] opacity-30 to-[rgba(139,92,246,0.25)] top-[90.58px] via-50% via-[rgba(139,92,246,0.19)] w-[360.507px]" data-name="Container" />
                  <div className="absolute h-[4px] left-px rounded-[3.35544e+07px] shadow-[0px_0px_20px_0px_rgba(139,92,246,0.38),0px_-2px_10px_0px_rgba(139,92,246,0.25)] top-[160px] w-[364.25px]" data-name="Container" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(139, 92, 246, 0.25) 20%, rgb(139, 92, 246) 50%, rgba(139, 92, 246, 0.25) 80%, rgba(0, 0, 0, 0) 100%)" }} />
                  <div className="absolute bg-[#8b5cf6] blur-2xl filter left-[293.12px] opacity-0 rounded-[3.35544e+07px] size-[80.256px] top-[-7.13px]" data-name="Container" />
                  <div className="absolute bg-[#8b5cf6] blur-2xl filter left-[-7.3px] opacity-0 rounded-[3.35544e+07px] size-[80.59px] top-[91.7px]" data-name="Container" />
                  <div className="absolute bg-[#8b5cf6] left-[74.15px] opacity-[0.328] rounded-[3.35544e+07px] size-[3.383px] top-[22.97px]" data-name="Container" />
                  <div className="absolute bg-[#8b5cf6] left-[183.64px] opacity-[0.477] rounded-[3.35544e+07px] size-[2.97px] top-[58.77px]" data-name="Container" />
                  <div className="absolute bg-[#8b5cf6] left-[292.92px] opacity-[0.075] rounded-[3.35544e+07px] size-[2.937px] top-[70.93px]" data-name="Container" />
                  <div className="absolute content-stretch flex flex-col gap-[12px] h-[123px] items-start left-[21px] pb-[-37.625px] pt-0 px-0 top-[21px] w-[324.25px]" data-name="ReportCard">
                    <BackgroundImage4>
                      <ContainerBackgroundImage3>
                        <div aria-hidden="true" className="absolute border border-[rgba(139,92,246,0.14)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_4px_12px_0px_rgba(139,92,246,0.08)]" />
                        <BackgroundImage5>
                          <ContainerBackgroundImage additionalClassNames="size-[16.609px]">
                            <IconBackgroundImage2>
                              <path d={svgPaths.p1c62f200} id="Vector" stroke="var(--stroke-0, #8B5CF6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.38409" />
                            </IconBackgroundImage2>
                          </ContainerBackgroundImage>
                        </BackgroundImage5>
                        <ReportCardBackgroundImage additionalClassNames="w-[37.328px]">
                          <p className="font-['Poppins:SemiBold',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#8b5cf6] text-[10px] text-nowrap tracking-[0.25px]">ACTIVE</p>
                        </ReportCardBackgroundImage>
                      </ContainerBackgroundImage3>
                      <div className="absolute left-0 size-[56px] top-0" data-name="Container">
                        <div className="absolute blur filter h-[64.771px] left-[-4.39px] opacity-0 rounded-[16px] top-[-4.39px] w-[64.772px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 64.772 64.771\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -4.58 -4.58 0 32.386 32.386)\\\'><stop stop-color=\\\'rgba(139,92,246,0.145)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(70,46,123,0.0725)\\\' offset=\\\'0.35\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'0.7\\\'/></radialGradient></defs></svg>')" }} />
                        <div className="absolute left-0 overflow-clip rounded-[16px] shadow-[0px_8px_24px_0px_rgba(139,92,246,0.19)] size-[56px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(139, 92, 246, 0.125) 0%, rgba(139, 92, 246, 0.208) 50%, rgba(139, 92, 246, 0.145) 100%)" }}>
                          <div className="absolute bg-gradient-to-b from-[rgba(255,255,255,0.6)] h-[28px] left-0 opacity-40 rounded-tl-[16px] rounded-tr-[16px] to-[rgba(0,0,0,0)] top-0 w-[56px]" data-name="ReportCard" />
                          <div className="absolute left-[56px] opacity-0 size-[56px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(0, 0, 0, 0) 30%, rgba(255, 255, 255, 0.6) 50%, rgba(0, 0, 0, 0) 70%)" }} />
                          <BackgroundImage6 additionalClassNames="size-[14.796px]">
                            <div className="content-stretch flex flex-col items-start opacity-0 relative size-[11.664px]" data-name="Container">
                              <IconBackgroundImage1 additionalClassNames="shadow-[0px_0px_8px_0px_#8b5cf6]" />
                            </div>
                          </BackgroundImage6>
                          <IconBackgroundImage5>
                            <g filter="url(#filter0_d_2355_820)" id="Icon">
                              <path d={svgPaths.p298da200} id="Vector" stroke="var(--stroke-0, #8B5CF6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
                              <path d={svgPaths.p1a52d00} id="Vector_2" stroke="var(--stroke-0, #8B5CF6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
                              <path d={svgPaths.p15969e80} id="Vector_3" stroke="var(--stroke-0, #8B5CF6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
                              <path d={svgPaths.pcf23980} id="Vector_4" stroke="var(--stroke-0, #8B5CF6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
                            </g>
                            <defs>
                              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="52" id="filter0_d_2355_820" width="52" x="-1.16667" y="-2.33333">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                <feOffset dy="2" />
                                <feGaussianBlur stdDeviation="6" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_2355_820" />
                                <feBlend in="SourceGraphic" in2="effect1_dropShadow_2355_820" mode="normal" result="shape" />
                              </filter>
                            </defs>
                          </IconBackgroundImage5>
                          <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.5),inset_0px_-2px_8px_0px_rgba(139,92,246,0.13)]" />
                        </div>
                        <div className="absolute border-2 border-[#8b5cf6] border-solid left-[-9.93px] opacity-[0.109] rounded-[16px] size-[75.87px] top-[-9.93px]" data-name="Container" />
                        <div className="absolute border-2 border-[#8b5cf6] border-solid left-[-12.86px] opacity-[0.176] rounded-[16px] size-[81.721px] top-[-12.86px]" data-name="Container" />
                      </div>
                    </BackgroundImage4>
                    <ContainerBackgroundImage1>
                      <HeadingBackgroundImageAndText text="All Consumers" />
                      <ParagraphBackgroundImageAndText text="Complete consumer database" />
                    </ContainerBackgroundImage1>
                    <div className="h-[36px] relative shrink-0 w-[324.25px]" data-name="Container">
                      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(139,92,246,0.06)] border-solid inset-0 pointer-events-none" />
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-0 pt-px px-0 relative size-full">
                        <ContainerBackgroundImage2>
                          <BackgroundImage7>
                            <ContainerBackgroundImage additionalClassNames="size-[17.714px]">
                              <div className="h-[17.714px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                                <VectorBackgroundImage4>
                                  <path d={svgPaths.p12338df0} id="Vector" stroke="var(--stroke-0, #8B5CF6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.47619" />
                                </VectorBackgroundImage4>
                                <VectorBackgroundImage5>
                                  <path d="M0.738097 0.738097V3.69048" id="Vector" stroke="var(--stroke-0, #8B5CF6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.47619" />
                                </VectorBackgroundImage5>
                                <VectorBackgroundImage6>
                                  <path d="M3.69048 0.738097H0.738097" id="Vector" stroke="var(--stroke-0, #8B5CF6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.47619" />
                                </VectorBackgroundImage6>
                                <VectorBackgroundImage7>
                                  <path d={svgPaths.p4744400} id="Vector" stroke="var(--stroke-0, #8B5CF6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.47619" />
                                </VectorBackgroundImage7>
                              </div>
                            </ContainerBackgroundImage>
                          </BackgroundImage7>
                          <ReportCardBackgroundImage additionalClassNames="w-[69.766px]">
                            <p className="font-['Poppins:SemiBold',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#8b5cf6] text-[10px] text-nowrap tracking-[1px] uppercase">Quick View</p>
                          </ReportCardBackgroundImage>
                        </ContainerBackgroundImage2>
                        <div className="h-[25px] relative rounded-[10px] shrink-0 w-[93.984px]" data-name="Container" style={{ backgroundImage: "linear-gradient(165.104deg, rgba(139, 92, 246, 0.082) 0%, rgba(139, 92, 246, 0.145) 100%)" }}>
                          <div aria-hidden="true" className="absolute border border-[rgba(139,92,246,0.19)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" />
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6.946px] items-center pl-[13px] pr-px py-px relative size-full">
                            <ReportCardBackgroundImage additionalClassNames="w-[47.984px]">
                              <p className="font-['Poppins:Bold',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#8b5cf6] text-[10px] text-nowrap">Generate</p>
                            </ReportCardBackgroundImage>
                            <ContainerBackgroundImage additionalClassNames="shrink-0 size-[14px]">
                              <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                                <VectorBackgroundImage8>
                                  <path d="M0.583333 0.583333H8.75" id="Vector" stroke="var(--stroke-0, #8B5CF6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                                </VectorBackgroundImage8>
                                <VectorBackgroundImage9>
                                  <path d={svgPaths.p1ab1aba0} id="Vector" stroke="var(--stroke-0, #8B5CF6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                                </VectorBackgroundImage9>
                              </div>
                            </ContainerBackgroundImage>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.8)]" />
                <div aria-hidden="true" className="absolute border border-[rgba(139,92,246,0.13)] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_4px_20px_0px_rgba(139,92,246,0.08),0px_2px_8px_0px_rgba(0,0,0,0.06),0px_0px_0px_1px_rgba(139,92,246,0.06)]" />
              </div>
              <div className="[grid-area:2_/_3] place-self-stretch relative rounded-[24px] shrink-0" data-name="Button" style={{ backgroundImage: "linear-gradient(155.748deg, rgba(100, 116, 139, 0.03) 0%, rgba(100, 116, 139, 0.016) 40%, rgb(255, 255, 255) 70%, rgba(100, 116, 139, 0.01) 100%)" }}>
                <div className="overflow-clip relative rounded-[inherit] size-full">
                  <div className="absolute h-[163px] left-px top-px w-[364.25px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 364.25 163\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -23.052 -51.513 0 0 0)\\'><stop stop-color=\\'rgba(100,116,139,0.082)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 364.25 163\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -23.052 -51.513 0 364.25 0)\\'><stop stop-color=\\'rgba(100,116,139,0.063)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 364.25 163\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -23.052 -51.513 0 0 163)\\'><stop stop-color=\\'rgba(100,116,139,0.03)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 364.25 163\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -23.052 -51.513 0 364.25 163)\\'><stop stop-color=\\'rgba(100,116,139,0.07)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>')" }} />
                  <div className="absolute h-[163px] left-px opacity-5 top-px w-[364.25px]" data-name="Container" style={{ backgroundImage: "linear-gradient(rgb(100, 116, 139) 0.6135%, rgba(0, 0, 0, 0) 0.6135%), linear-gradient(90deg, rgb(100, 116, 139) 0.27454%, rgba(0, 0, 0, 0) 0.27454%)" }} />
                  <div className="absolute blur-3xl filter left-[105.85px] opacity-25 rounded-[3.35544e+07px] size-[128px] top-[105.85px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 128 128\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -9.051 -9.051 0 64 64)\\\'><stop stop-color=\\\'rgba(100,116,139,0.376)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(100,116,139,0.19)\\\' offset=\\\'0.5\\\'/><stop stop-color=\\\'rgba(50,58,70,0.095)\\\' offset=\\\'0.6\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'0.7\\\'/></radialGradient></defs></svg>')" }} />
                  <div className="absolute h-[163px] left-[650.14px] top-px w-[364.25px]" data-name="Container" style={{ backgroundImage: "linear-gradient(129.123deg, rgba(0, 0, 0, 0) 41.697%, rgba(100, 116, 139, 0.082) 50%, rgba(0, 0, 0, 0) 58.303%)" }} />
                  <div className="absolute bg-gradient-to-b blur filter from-[rgba(0,0,0,0)] h-[79.178px] left-[2.87px] opacity-30 to-[rgba(100,116,139,0.25)] top-[90.58px] via-50% via-[rgba(100,116,139,0.19)] w-[360.507px]" data-name="Container" />
                  <div className="absolute h-[4px] left-px rounded-[3.35544e+07px] shadow-[0px_0px_20px_0px_rgba(100,116,139,0.38),0px_-2px_10px_0px_rgba(100,116,139,0.25)] top-[160px] w-[364.25px]" data-name="Container" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(100, 116, 139, 0.25) 20%, rgb(100, 116, 139) 50%, rgba(100, 116, 139, 0.25) 80%, rgba(0, 0, 0, 0) 100%)" }} />
                  <div className="absolute bg-[#64748b] blur-2xl filter left-[293.12px] opacity-0 rounded-[3.35544e+07px] size-[80.256px] top-[-7.13px]" data-name="Container" />
                  <div className="absolute bg-[#64748b] blur-2xl filter left-[-7.3px] opacity-0 rounded-[3.35544e+07px] size-[80.59px] top-[91.7px]" data-name="Container" />
                  <div className="absolute bg-[#64748b] left-[74.15px] opacity-[0.328] rounded-[3.35544e+07px] size-[3.383px] top-[22.97px]" data-name="Container" />
                  <div className="absolute bg-[#64748b] left-[183.64px] opacity-[0.477] rounded-[3.35544e+07px] size-[2.97px] top-[58.77px]" data-name="Container" />
                  <div className="absolute bg-[#64748b] left-[292.92px] opacity-[0.075] rounded-[3.35544e+07px] size-[2.937px] top-[70.93px]" data-name="Container" />
                  <div className="absolute content-stretch flex flex-col gap-[12px] h-[123px] items-start left-[21px] pb-[-37.625px] pt-0 px-0 top-[21px] w-[324.25px]" data-name="ReportCard">
                    <BackgroundImage4>
                      <ContainerBackgroundImage3>
                        <div aria-hidden="true" className="absolute border border-[rgba(100,116,139,0.14)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_4px_12px_0px_rgba(100,116,139,0.08)]" />
                        <BackgroundImage5>
                          <ContainerBackgroundImage additionalClassNames="size-[16.609px]">
                            <IconBackgroundImage2>
                              <path d={svgPaths.p1c62f200} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.38409" />
                            </IconBackgroundImage2>
                          </ContainerBackgroundImage>
                        </BackgroundImage5>
                        <ReportCardBackgroundImage additionalClassNames="w-[37.328px]">
                          <p className="font-['Poppins:SemiBold',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#64748b] text-[10px] text-nowrap tracking-[0.25px]">ACTIVE</p>
                        </ReportCardBackgroundImage>
                      </ContainerBackgroundImage3>
                      <div className="absolute left-0 size-[56px] top-0" data-name="Container">
                        <div className="absolute blur filter left-[-4.39px] opacity-0 rounded-[16px] size-[64.771px] top-[-4.39px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 64.771 64.771\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -4.58 -4.58 0 32.386 32.386)\\\'><stop stop-color=\\\'rgba(100,116,139,0.145)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'0.7\\\'/></radialGradient></defs></svg>')" }} />
                        <div className="absolute left-0 overflow-clip rounded-[16px] shadow-[0px_8px_24px_0px_rgba(100,116,139,0.19)] size-[56px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(100, 116, 139, 0.125) 0%, rgba(100, 116, 139, 0.208) 50%, rgba(100, 116, 139, 0.145) 100%)" }}>
                          <div className="absolute bg-gradient-to-b from-[rgba(255,255,255,0.6)] h-[28px] left-0 opacity-40 rounded-tl-[16px] rounded-tr-[16px] to-[rgba(0,0,0,0)] top-0 w-[56px]" data-name="ReportCard" />
                          <div className="absolute left-[56px] opacity-0 size-[56px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(0, 0, 0, 0) 30%, rgba(255, 255, 255, 0.6) 50%, rgba(0, 0, 0, 0) 70%)" }} />
                          <BackgroundImage6 additionalClassNames="size-[14.796px]">
                            <div className="content-stretch flex flex-col items-start opacity-0 relative size-[11.664px]" data-name="Container">
                              <IconBackgroundImage1 additionalClassNames="shadow-[0px_0px_8px_0px_#64748b]" />
                            </div>
                          </BackgroundImage6>
                          <IconBackgroundImage5>
                            <g filter="url(#filter0_d_2355_939)" id="Icon">
                              <path d={svgPaths.p298da200} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
                              <path d={svgPaths.pcf23980} id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
                              <path d="M30.6667 17L36.5 22.8333" id="Vector_3" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
                              <path d="M36.5 17L30.6667 22.8333" id="Vector_4" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
                            </g>
                            <defs>
                              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="52" id="filter0_d_2355_939" width="52" x="-1.16667" y="-2.33333">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                <feOffset dy="2" />
                                <feGaussianBlur stdDeviation="6" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_2355_939" />
                                <feBlend in="SourceGraphic" in2="effect1_dropShadow_2355_939" mode="normal" result="shape" />
                              </filter>
                            </defs>
                          </IconBackgroundImage5>
                          <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.5),inset_0px_-2px_8px_0px_rgba(100,116,139,0.13)]" />
                        </div>
                        <div className="absolute border-2 border-[#64748b] border-solid left-[-9.93px] opacity-[0.109] rounded-[16px] size-[75.87px] top-[-9.93px]" data-name="Container" />
                        <div className="absolute border-2 border-[#64748b] border-solid left-[-12.86px] opacity-[0.176] rounded-[16px] size-[81.721px] top-[-12.86px]" data-name="Container" />
                      </div>
                    </BackgroundImage4>
                    <ContainerBackgroundImage1>
                      <HeadingBackgroundImageAndText text="Closed Connection List" />
                      <ParagraphBackgroundImageAndText text="Terminated or inactive connections" />
                    </ContainerBackgroundImage1>
                    <div className="h-[36px] relative shrink-0 w-[324.25px]" data-name="Container">
                      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(100,116,139,0.06)] border-solid inset-0 pointer-events-none" />
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-0 pt-px px-0 relative size-full">
                        <ContainerBackgroundImage2>
                          <BackgroundImage7>
                            <ContainerBackgroundImage additionalClassNames="size-[17.714px]">
                              <div className="h-[17.714px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                                <VectorBackgroundImage4>
                                  <path d={svgPaths.pea8d200} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4762" />
                                </VectorBackgroundImage4>
                                <VectorBackgroundImage5>
                                  <path d="M0.738098 0.738098V3.69049" id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4762" />
                                </VectorBackgroundImage5>
                                <VectorBackgroundImage6>
                                  <path d="M3.69049 0.738098H0.738098" id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4762" />
                                </VectorBackgroundImage6>
                                <VectorBackgroundImage7>
                                  <path d={svgPaths.p1141a100} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4762" />
                                </VectorBackgroundImage7>
                              </div>
                            </ContainerBackgroundImage>
                          </BackgroundImage7>
                          <ReportCardBackgroundImage additionalClassNames="w-[69.766px]">
                            <p className="font-['Poppins:SemiBold',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#64748b] text-[10px] text-nowrap tracking-[1px] uppercase">Quick View</p>
                          </ReportCardBackgroundImage>
                        </ContainerBackgroundImage2>
                        <div className="h-[25px] relative rounded-[10px] shrink-0 w-[93.984px]" data-name="Container" style={{ backgroundImage: "linear-gradient(165.104deg, rgba(100, 116, 139, 0.082) 0%, rgba(100, 116, 139, 0.145) 100%)" }}>
                          <div aria-hidden="true" className="absolute border border-[rgba(100,116,139,0.19)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" />
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6.946px] items-center pl-[13px] pr-px py-px relative size-full">
                            <ReportCardBackgroundImage additionalClassNames="w-[47.984px]">
                              <p className="font-['Poppins:Bold',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#64748b] text-[10px] text-nowrap">Generate</p>
                            </ReportCardBackgroundImage>
                            <ContainerBackgroundImage additionalClassNames="shrink-0 size-[14px]">
                              <div className="h-[14px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                                <VectorBackgroundImage8>
                                  <path d="M0.583333 0.583333H8.75" id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                                </VectorBackgroundImage8>
                                <VectorBackgroundImage9>
                                  <path d={svgPaths.p1ab1aba0} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                                </VectorBackgroundImage9>
                              </div>
                            </ContainerBackgroundImage>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.8)]" />
                <div aria-hidden="true" className="absolute border border-[rgba(100,116,139,0.13)] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_4px_20px_0px_rgba(100,116,139,0.08),0px_2px_8px_0px_rgba(0,0,0,0.06),0px_0px_0px_1px_rgba(100,116,139,0.06)]" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col h-[66px] items-start left-[72px] pb-px pt-[12px] px-[24px] top-[277.56px] w-[1573px]" data-name="TabNavigation">
          <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
          <div className="h-[41px] overflow-clip relative shrink-0 w-full" data-name="Container">
            <div className="absolute bg-[rgba(255,255,255,0)] h-[41px] left-0 overflow-clip rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] top-0 w-[191.469px]" data-name="Button">
              <div className="absolute bg-gradient-to-r from-[#2b7fff] h-[41px] left-0 to-[#00b8db] top-0 w-[191.469px]" data-name="Container" />
              <div className="absolute content-stretch flex h-[20px] items-start left-[24px] top-[10px] w-[143.469px]" data-name="TabNavigation">
                <p className="font-['Poppins:Medium',sans-serif] leading-[21px] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white">Quallity Assessment</p>
              </div>
            </div>
            <div className="absolute bg-[rgba(255,255,255,0.9)] content-stretch flex flex-col h-[41px] items-start left-[199.47px] overflow-clip pb-0 pt-[10px] px-[24px] rounded-[14px] top-0 w-[169.25px]" data-name="Button">
              <TabNavigationBackgroundImageAndText text="Collection Report" />
            </div>
            <div className="absolute bg-[rgba(255,255,255,0.9)] content-stretch flex flex-col h-[41px] items-start left-[376.72px] overflow-clip pb-0 pt-[10px] px-[24px] rounded-[14px] top-0 w-[130.156px]" data-name="Button">
              <TabNavigationBackgroundImageAndText text="CRM Report" />
            </div>
            <div className="absolute bg-[rgba(255,255,255,0.9)] content-stretch flex flex-col h-[41px] items-start left-[514.88px] overflow-clip pb-0 pt-[10px] px-[24px] rounded-[14px] top-0 w-[145.578px]" data-name="Button">
              <TabNavigationBackgroundImageAndText text="Quick Reports" />
            </div>
          </div>
        </div>
        <div className="absolute bg-gradient-to-r content-stretch flex flex-col from-[#eff6ff] h-[106px] items-start left-[72px] pb-px pt-[24px] px-[24px] to-[#eff6ff] top-[138.56px] via-50% via-[#ffffff] w-[1573px]" data-name="EngineTabNavigation">
          <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
          <div className="h-[65px] relative shrink-0 w-full" data-name="Container">
            <div className="absolute h-[65px] left-0 top-0 w-[623.969px]" data-name="Container">
              <div className="absolute bg-[rgba(255,255,255,0)] h-[63px] left-0 overflow-clip rounded-[14px] shadow-[0px_4px_12px_-2px_rgba(0,90,167,0.25)] top-px w-[304.672px]" data-name="Button">
                <div className="absolute bg-gradient-to-b from-[#005aa7] h-[63px] left-0 to-[#00c6ff] top-0 w-[304.672px]" data-name="Container" />
                <div className="absolute bg-gradient-to-r from-[rgba(0,0,0,0)] h-[63px] left-[609.34px] to-[rgba(0,0,0,0)] top-0 via-50% via-[rgba(255,255,255,0.2)] w-[304.672px]" data-name="Container" />
                <div className="absolute content-stretch flex flex-col items-start left-[32px] size-[24px] top-[19.5px]" data-name="EngineTabNavigation">
                  <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                    <div className="absolute inset-[12.5%]" data-name="Vector">
                      <div className="absolute inset-[-5.56%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                          <path d={svgPaths.p3cc29400} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-[29.17%] left-3/4 right-1/4 top-[37.5%]" data-name="Vector">
                      <div className="absolute inset-[-12.5%_-1px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 10">
                          <path d="M1 9V1" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute inset-[20.83%_45.83%_29.17%_54.17%]" data-name="Vector">
                      <div className="absolute inset-[-8.33%_-1px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 14">
                          <path d="M1 13V1" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute inset-[58.33%_66.67%_29.17%_33.33%]" data-name="Vector">
                      <BackgroundImage1 additionalClassNames="inset-[-33.33%_-1px]">
                        <path d="M1 4V1" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      </BackgroundImage1>
                    </div>
                  </div>
                </div>
                <div className="absolute content-stretch flex flex-col gap-[2px] h-[39px] items-start left-[68px] top-[12px] w-[204.672px]" data-name="EngineTabNavigation">
                  <div className="content-stretch flex h-[21px] items-start relative shrink-0 w-full" data-name="Container">
                    <p className="basis-0 font-['Poppins:SemiBold',sans-serif] grow leading-[21px] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-white">Report Engine</p>
                  </div>
                  <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
                    <p className="absolute font-['Poppins:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-[rgba(255,255,255,0.9)] text-nowrap top-0">Generate comprehensive reports</p>
                  </div>
                </div>
              </div>
              <div className="absolute bg-[rgba(255,255,255,0.8)] border border-[#d1d5dc] border-solid h-[65px] left-[328.67px] overflow-clip rounded-[14px] top-0 w-[295.297px]" data-name="Button">
                <div className="absolute bg-[rgba(0,0,0,0)] h-[63px] left-0 top-0 w-[293.297px]" data-name="Container" />
                <div className="absolute content-stretch flex flex-col items-start left-[32px] size-[24px] top-[19.5px]" data-name="EngineTabNavigation">
                  <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                    <div className="absolute inset-[8.33%_12.5%_66.67%_12.5%]" data-name="Vector">
                      <div className="absolute inset-[-16.67%_-5.56%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 8">
                          <path d={svgPaths.p3dbdf300} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute inset-[20.83%_12.5%_8.33%_12.5%]" data-name="Vector">
                      <div className="absolute inset-[-5.88%_-5.56%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 19">
                          <path d={svgPaths.p33169800} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-[37.5%] left-[12.5%] right-[12.5%] top-1/2" data-name="Vector">
                      <div className="absolute inset-[-33.33%_-5.56%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 5">
                          <path d={svgPaths.p3ac3f240} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute content-stretch flex flex-col gap-[2px] h-[39px] items-start left-[68px] top-[12px] w-[193.297px]" data-name="EngineTabNavigation">
                  <div className="content-stretch flex h-[21px] items-start relative shrink-0 w-full" data-name="Container">
                    <p className="basis-0 font-['Poppins:SemiBold',sans-serif] grow leading-[21px] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[14px]">Data Mitra</p>
                  </div>
                  <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
                    <p className="absolute font-['Poppins:Regular',sans-serif] leading-[16px] left-0 not-italic text-[#6a7282] text-[12px] text-nowrap top-0">Download Any Report Any Time</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bg-gradient-to-r from-[#ff6900] h-[56px] left-[1344.97px] overflow-clip rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] to-[#e60076] top-[4.5px] w-[180.031px]" data-name="Button">
              <div className="absolute bg-gradient-to-r from-[rgba(0,0,0,0)] h-[56px] left-[360.06px] to-[rgba(0,0,0,0)] top-0 via-50% via-[rgba(255,255,255,0.3)] w-[180.031px]" data-name="Container" />
              <div className="absolute bg-[rgba(255,255,255,0.2)] blur-xl filter h-[56px] left-0 opacity-30 top-0 w-[180.031px]" data-name="Container" />
              <div className="absolute left-[24px] size-[24px] top-[16px]" data-name="Icon">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                  <g id="Icon">
                    <path d={svgPaths.p25c35000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </g>
                </svg>
              </div>
              <div className="absolute content-stretch flex h-[21px] items-start left-[56px] top-[17.5px] w-[100.031px]" data-name="EngineTabNavigation">
                <p className="font-['Poppins:SemiBold',sans-serif] leading-[21px] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white">Download Log</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute blur-[0.5px] filter left-[422.5px] opacity-[0.03] size-[800px] top-[76px]" data-name="App">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgApp} />
      </div>
      <div className="absolute left-[1293px] opacity-[0.06] size-[320px] top-[576px]" data-name="ReportEngine">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgReportEngine} />
      </div>
      <div className="absolute bg-gradient-to-b from-[#1e88e5] h-[952px] left-0 overflow-clip shadow-[4px_0px_32px_0px_rgba(0,0,0,0.4)] to-[#0d47a1] top-0 via-50% via-[#1565c0] w-[72px]" data-name="Sidebar">
        <div className="absolute h-[952px] left-0 opacity-5 top-0 w-[72px]" data-name="Sidebar" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 72 952\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -66.888 -66.888 0 14.4 285.6)\\'><stop stop-color=\\'rgba(255,255,255,0.4)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(191,191,191,0.3)\\' offset=\\'0.125\\'/><stop stop-color=\\'rgba(128,128,128,0.2)\\' offset=\\'0.25\\'/><stop stop-color=\\'rgba(64,64,64,0.1)\\' offset=\\'0.375\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 72 952\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -66.888 -66.888 0 57.6 666.4)\\'><stop stop-color=\\'rgba(255,255,255,0.3)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(191,191,191,0.225)\\' offset=\\'0.125\\'/><stop stop-color=\\'rgba(128,128,128,0.15)\\' offset=\\'0.25\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>')" }} />
        <div className="absolute content-stretch flex flex-col gap-[8px] h-[842px] items-start left-0 pb-0 pt-[16px] px-[16px] top-[73px] w-[72px]" data-name="Sidebar">
          <div className="bg-[rgba(255,255,255,0.25)] h-[68px] overflow-clip relative rounded-[14px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.15)] shrink-0 w-full" data-name="Button">
            <div className="absolute h-[68px] left-0 top-0 w-[40px]" data-name="Container" style={{ backgroundImage: "linear-gradient(120.466deg, rgba(255, 255, 255, 0.2) 0%, rgba(0, 198, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 100%)" }} />
            <div className="absolute border-2 border-[rgba(255,255,255,0.4)] border-solid h-[68.959px] left-[-0.28px] opacity-50 rounded-[14px] top-[-0.48px] w-[40.564px]" data-name="Container" />
            <div className="absolute bg-white left-[17.5px] rounded-[3.35544e+07px] shadow-[0px_0px_12px_0px_rgba(255,255,255,0.8),0px_0px_4px_0px_rgba(0,198,255,0.6)] size-[11.001px] top-[28.5px]" data-name="Container" />
            <div className="absolute bg-gradient-to-r from-[rgba(0,0,0,0)] h-[68px] left-[80px] opacity-0 to-[rgba(0,0,0,0)] top-0 via-50% via-[rgba(255,255,255,0.1)] w-[40px]" data-name="Container" />
            <div className="absolute bg-[rgba(255,255,255,0.4)] content-stretch flex items-center justify-center left-[12px] rounded-[10px] shadow-[0px_4px_16px_0px_rgba(255,255,255,0.25),0px_0px_20px_0px_rgba(0,198,255,0.3)] size-[40px] top-[14px]" data-name="Sidebar">
              <ContainerBackgroundImage additionalClassNames="shrink-0 size-[20px]">
                <div className="h-[20px] overflow-clip relative shadow-[0px_2px_8px_0px_rgba(0,0,0,0.2)] shrink-0 w-full" data-name="Icon">
                  <div className="absolute inset-[8.33%_16.67%]" data-name="Vector">
                    <div className="absolute inset-[-5%_-6.25%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 19">
                        <path d={svgPaths.p2b8e5100} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute inset-[8.33%_16.67%_66.67%_58.33%]" data-name="Vector">
                    <div className="absolute inset-[-16.67%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
                        <path d={svgPaths.p3b6dc480} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute inset-[37.5%_58.33%_62.5%_33.33%]" data-name="Vector">
                    <div className="absolute inset-[-0.83px_-50%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 2">
                        <path d="M2.5 0.833333H0.833333" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      </svg>
                    </div>
                  </div>
                  <Icon46VectorBackgroundImage additionalClassNames="inset-[54.17%_33.33%_45.83%_33.33%]" />
                  <Icon46VectorBackgroundImage additionalClassNames="inset-[70.83%_33.33%_29.17%_33.33%]" />
                </div>
              </ContainerBackgroundImage>
            </div>
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.3)]" />
          </div>
          <div className="h-[68px] overflow-clip relative rounded-[14px] shrink-0 w-full" data-name="Button">
            <div className="absolute bg-gradient-to-r from-[rgba(0,0,0,0)] h-[68px] left-[80px] opacity-0 to-[rgba(0,0,0,0)] top-0 via-50% via-[rgba(255,255,255,0.1)] w-[40px]" data-name="Container" />
            <div className="absolute bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center left-[12px] rounded-[10px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)] size-[40px] top-[14px]" data-name="Sidebar">
              <ContainerBackgroundImage additionalClassNames="shrink-0 size-[20px]">
                <div className="h-[20px] overflow-clip relative shadow-[0px_2px_8px_0px_rgba(0,0,0,0.2)] shrink-0 w-full" data-name="Icon">
                  <div className="absolute inset-[12.5%_8.33%_8.35%_8.33%]" data-name="Vector">
                    <div className="absolute inset-[-5.26%_-5%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 18">
                        <path d={svgPaths.p190f2380} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      </svg>
                    </div>
                  </div>
                </div>
              </ContainerBackgroundImage>
            </div>
          </div>
        </div>
        <div className="absolute content-stretch flex flex-col h-[37px] items-start left-0 pb-0 pt-[17px] px-[16px] top-[915px] w-[72px]" data-name="Sidebar">
          <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none" />
          <div className="bg-gradient-to-r from-[rgba(0,0,0,0)] h-[4px] opacity-30 rounded-[3.35544e+07px] shrink-0 to-[rgba(0,0,0,0)] via-50% via-[rgba(255,255,255,0.4)] w-full" data-name="Container" />
        </div>
        <div className="absolute bg-gradient-to-b content-stretch flex flex-col from-[rgba(255,255,255,0.12)] h-[73px] items-start left-0 pb-px pt-[16px] px-[16px] to-[rgba(0,0,0,0)] top-0 w-[72px]" data-name="Sidebar">
          <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none" />
          <div className="bg-white h-[40px] overflow-clip relative rounded-[14px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.15)] shrink-0 w-full" data-name="Container">
            <div className="absolute bg-gradient-to-r from-[rgba(0,0,0,0)] left-[80px] size-[40px] to-[rgba(0,0,0,0)] top-0 via-50% via-[rgba(255,255,255,0.3)]" data-name="Container" />
            <div className="absolute left-[4px] size-[32px] top-[4px]" data-name="Image (Maharashtra Logo)">
              <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageMaharashtraMunicipalCorporationLogo} />
            </div>
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.5)]" />
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none shadow-[inset_-1px_0px_0px_0px_rgba(255,255,255,0.2)]" />
      </div>
    </div>
  );
}