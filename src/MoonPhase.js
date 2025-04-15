import React from "react";

export default function MoonPhase(props) {
  function calculateMoonPhase(date) {
    let lunarCycle = 29.53058770576;
    let newMoonReference = new Date(2000, 0, 6).getTime();
    let daysSinceReferenceNewMoon =
      (date.getTime() - newMoonReference) / (1000 * 60 * 60 * 24);
    return (daysSinceReferenceNewMoon % lunarCycle) / lunarCycle;
  }

  function getMoonPhaseName(date) {
    if (!date) return "Unknown";

    let phase = calculateMoonPhase(date);

    if (phase < 0.025 || phase >= 0.975) return "New Moon";
    if (phase >= 0.025 && phase < 0.225) return "Waxing Crescent";
    if (phase >= 0.225 && phase < 0.275) return "First Quarter";
    if (phase >= 0.275 && phase < 0.475) return "Waxing Gibbous";
    if (phase >= 0.475 && phase < 0.525) return "Full Moon";
    if (phase >= 0.525 && phase < 0.725) return "Waning Gibbous";
    if (phase >= 0.725 && phase < 0.775) return "Last Quarter";
    if (phase >= 0.775 && phase < 0.975) return "Waning Crescent";

    return "Unknown";
  }

  function getMoonPhaseEmoji(date) {
    if (!date) return "🌑";

    let phase = calculateMoonPhase(date);

    if (phase < 0.025 || phase >= 0.975) return "🌑";
    if (phase >= 0.025 && phase < 0.225) return "🌒";
    if (phase >= 0.225 && phase < 0.275) return "🌓";
    if (phase >= 0.275 && phase < 0.475) return "🌔";
    if (phase >= 0.475 && phase < 0.525) return "🌕";
    if (phase >= 0.525 && phase < 0.725) return "🌖";
    if (phase >= 0.725 && phase < 0.775) return "🌗";
    if (phase >= 0.775 && phase < 0.975) return "🌘";

    return "🌑";
  }

  let date = props.date;

  return (
    <li>
      {getMoonPhaseEmoji(date)} <strong>Moon</strong>: {getMoonPhaseName(date)}
    </li>
  );
}
