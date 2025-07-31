import { useState } from "react";

function App() {
  const [cardholderName, setCardholderName] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [cvc, setCvc] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const d = new Date();

  function submitForm(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    const newErrors = {
      cardholderName: "",
      cardNumber: "",
      month: "",
      year: "",
      cvc: "",
    };
    console.log(Object.values(newErrors));

    if (!cardholderName) newErrors.cardholderName = "Can't be blank";
    if (!cardNumber) {
      newErrors.cardNumber = "Can't be blank";
    } else if (!/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(cardNumber)) {
      newErrors.cardNumber = "Card number must be valid";
    }
    if (!month) {
      newErrors.month = "Can't be blank";
    } else if (Number(month) > 12 || Number(month) < 1) {
      newErrors.month = "Month must be valid";
    } else if (
      Number(month) <= d.getMonth() &&
      d.getFullYear() === 2000 + Number(year)
    ) {
      newErrors.month = "Month must be valid";
    }

    if (!year) {
      newErrors.year = "Can't be blank";
    } else {
      if (2000 + Number(year) < d.getFullYear())
        newErrors.year = "Year must be valid";
    }
    if (!cvc) {
      newErrors.cvc = "Can't be blank";
    } else if (!(0 <= Number(cvc) && Number(cvc) <= 999)) {
      newErrors.cvc = "CVC must be valid";
    }

    if (Object.values(newErrors).some((val) => val !== "")) {
      setErrors(newErrors);
      return;
    }
    setSubmitted(true);
  }

  function continueBtn() {
    setSubmitted(false);
    setCardholderName("");
    setCardNumber("");
    setMonth("");
    setYear("");
    setCvc("");
  }

  if (submitted) {
    return (
      <div className="font-space-grotesk min-h-screen relative bg-white flex lg:flex-row flex-col">
        <div className="absolute top-0 left-0 w-full lg:w-[30%] h-[240px] lg:h-full z-0">
          <img
            src="src/images/bg-main-mobile.png"
            alt=""
            className="block lg:hidden w-full h-full object-cover"
          />
          <img
            src="src/images/bg-main-desktop.png"
            alt=""
            className="hidden lg:block w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 px-6 pt-10 lg:pt-0 lg:pl-32 lg:pr-0 flex flex-col-reverse lg:flex-col lg:gap-10 lg:items-start lg:justify-center lg:min-h-screen">
          <div className="relative w-[285px] h-[157px] lg:w-[447px] lg:h-[245px] -mt-[68px] z-20">
            <img
              src="src/images/bg-card-front.png"
              alt="Front of card"
              className="absolute w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full p-4 lg:p-8 text-white">
              <img
                src="src/images/card-logo.svg"
                alt=""
                className="h-8 lg:h-12"
              />
              <div className="mt-8 lg:mt-12 lg:text-[29px] text-[19px] tracking-widest font-medium">
                {cardNumber ? cardNumber : "0000 0000 0000 0000"}
              </div>
              <div className="flex justify-between text-xs lg:text-base mt-4 lg:mt-6">
                <span className="tracking-[0.12em] lg:text-sm text-[10px]">
                  {cardholderName
                    ? cardholderName.toUpperCase()
                    : "JANE APPLESEED"}
                </span>
                <span className="tracking-[0.12em] lg:text-sm text-[10px]">
                  {month ? month : "00"}/{year ? year : "00"}
                </span>
              </div>
            </div>
          </div>
          <div className="relative w-[285px] h-[157px] lg:w-[447px] lg:h-[245px] self-end lg:self-start lg:ml-24">
            <img
              src="src/images/bg-card-back.png"
              alt="Back of card"
              className="absolute w-full h-full object-cover"
            />
            <div className="absolute top-[70px] right-[40px] lg:top-[108px] lg:right-[60px] text-white text-xs lg:text-base tracking-widest">
              {cvc ? cvc : "000"}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full lg:h-auto h-full font-medium">
          <div className="flex flex-col items-center justify-center lg:w-2xs w-full gap-y-6 lg:p-0 p-6 lg:mt-0 mt-10">
            <img
              src="src\images\icon-complete.svg"
              alt=""
              className="lg:size-14 size-18"
            />
            <div className="flex flex-col gap-y-1.5 items-center">
              <span className="lg:text-xl text-2xl tracking-widest">
                THANK YOU!
              </span>
              <span className="lg:text-sm text-md text-[hsl(212,12%,71%)]">
                We've added your card details
              </span>
            </div>
            <button
              onClick={continueBtn}
              className="w-full cursor-pointer bg-[hsl(278,68%,11%)] text-white lg:py-2 py-3 rounded-lg"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  } else
    return (
      <div className="font-space-grotesk min-h-screen relative bg-white flex lg:flex-row flex-col">
        <div className="absolute top-0 left-0 w-full lg:w-[30%] h-[240px] lg:h-full z-0">
          <img
            src="src/images/bg-main-mobile.png"
            alt=""
            className="block lg:hidden w-full h-full object-cover"
          />
          <img
            src="src/images/bg-main-desktop.png"
            alt=""
            className="hidden lg:block w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 px-6 pt-10 lg:pt-0 lg:pl-32 lg:pr-0 flex flex-col-reverse lg:flex-col lg:gap-10 lg:items-start lg:justify-center lg:min-h-screen">
          <div className="relative w-[285px] h-[157px] lg:w-[447px] lg:h-[245px] -mt-[68px] z-20">
            <img
              src="src/images/bg-card-front.png"
              alt="Front of card"
              className="absolute w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full p-4 lg:p-8 text-white">
              <img
                src="src/images/card-logo.svg"
                alt=""
                className="h-8 lg:h-12"
              />
              <div className="mt-8 lg:mt-12 lg:text-[29px] text-[19px] tracking-widest font-medium">
                {cardNumber ? cardNumber : "0000 0000 0000 0000"}
              </div>
              <div className="flex justify-between text-xs lg:text-base mt-4 lg:mt-6">
                <span className="tracking-[0.12em] lg:text-sm text-[10px]">
                  {cardholderName
                    ? cardholderName.toUpperCase()
                    : "JANE APPLESEED"}
                </span>
                <span className="tracking-[0.12em] lg:text-sm text-[10px]">
                  {month ? month : "00"}/{year ? year : "00"}
                </span>
              </div>
            </div>
          </div>
          <div className="relative w-[285px] h-[157px] lg:w-[447px] lg:h-[245px] self-end lg:self-start lg:ml-24">
            <img
              src="src/images/bg-card-back.png"
              alt="Back of card"
              className="absolute w-full h-full object-cover"
            />
            <div className="absolute top-[70px] right-[40px] lg:top-[108px] lg:right-[60px] text-white text-xs lg:text-base tracking-widest">
              {cvc ? cvc : "000"}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full font-medium">
          <div className="flex flex-col gap-y-6 lg:w-[355px] w-full p-8 lg:p-0 pt-14">
            <div className="flex flex-col w-full gap-y-1.5">
              <span className="text-xs font-semibold tracking-[0.15em]">
                CARDHOLDER NAME
              </span>
              <input
                type="text"
                placeholder="e.g. Jane Appleseed"
                id="cardholderName"
                //value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                className={`border-[1.5px] pl-3.5 py-2 rounded-lg w-full border-[hsl(270,3%,87%)] focus:outline-none ${
                  errors.cardholderName
                    ? "border-red-400"
                    : "focus:border-[hsl(278,94%,30%)]"
                }`}
              />
              <span className="text-xs text-red-400">
                {errors.cardholderName}
              </span>
            </div>
            <div className="flex flex-col w-full gap-y-1.5">
              <span className="text-xs font-semibold tracking-[0.15em]">
                CARD NUMBER
              </span>
              <input
                type="text"
                placeholder="e.g. 1234 5678 9123 0000"
                id="cardNumber"
                //value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className={`border-[1.5px] pl-3.5 py-2 rounded-lg w-full border-[hsl(270,3%,87%)] focus:outline-none ${
                  errors.cardNumber
                    ? "border-red-400"
                    : "focus:border-[hsl(278,94%,30%)]"
                }`}
              />
              <span className="text-xs text-red-400">{errors.cardNumber}</span>
            </div>
            <div className="flex flex-row gap-x-5 justify-start w-full">
              <div className="flex flex-col gap-y-1.5">
                <span className="text-xs font-semibold tracking-[0.15em]">
                  EXP. DATE (MM/YY)
                </span>
                <div className="flex flex-row gap-x-2.5">
                  <div className="flex flex-col">
                    <input
                      type="text"
                      placeholder="MM"
                      id="month"
                      //value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      className={`border-[1.5px] pl-3.5 py-2 rounded-lg border-[hsl(270,3%,87%)] lg:w-20 w-18 focus:outline-none ${
                        errors.month
                          ? "border-red-400"
                          : "focus:border-[hsl(278,94%,30%)]"
                      }`}
                    />
                    <span className="text-xs text-red-400 lg:w-20 w-18">
                      {errors.month}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <input
                      type="text"
                      placeholder="YY"
                      id="year"
                      //value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className={`border-[1.5px] pl-3.5 py-2 rounded-lg border-[hsl(270,3%,87%)] lg:w-20 w-18 focus:outline-none ${
                        errors.year
                          ? "border-red-400"
                          : "focus:border-[hsl(278,94%,30%)]"
                      }`}
                    />
                    <span className="text-xs text-red-400 lg:w-20 w-18">
                      {errors.year}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-y-1.5">
                <span className="text-xs font-semibold tracking-[0.15em]">
                  CVC
                </span>
                <input
                  type="text"
                  placeholder="e.g. 123"
                  id="cvc"
                  //value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  className={`border-[1.5px] pl-3.5 py-2 rounded-lg border-[hsl(270,3%,87%)] w-full focus:outline-none ${
                    errors.cvc
                      ? "border-red-400"
                      : "focus:border-[hsl(278,94%,30%)]"
                  }`}
                />
                <span className="text-xs text-red-400">{errors.cvc}</span>
              </div>
            </div>
            <button
              type="submit"
              onClick={submitForm}
              className="w-full cursor-pointer bg-[hsl(278,68%,11%)] text-white py-3 rounded-lg"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
}

export default App;
