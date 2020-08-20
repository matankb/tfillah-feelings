import { Prayer, Feeling } from "src/types/types";

const MAX_PRAYER_PER_FEELING = 3;

function getPrayerScore(prayer: Prayer, feeling: Feeling) {
  const matches = prayer.responses.filter(response => (
    response.feeling === feeling.id
  ));
  return matches.length;
}

interface FeelingsPrayersGroup {
  feeling: Feeling;
  prayers: Prayer[];
}

// Get top 3 prayers for each feeling
function getFeelingsPrayersGroups(prayers: Prayer[], feelings: Feeling[]): FeelingsPrayersGroup[] {
  return feelings.map(feeling => {
    const feelingSuggestedPrayers = prayers
      .map(prayer => {
        const score = getPrayerScore(prayer, feeling);
        return { prayer, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_PRAYER_PER_FEELING)
      .map(({ prayer }) => prayer);
    return {
      prayers: feelingSuggestedPrayers,
      feeling,
    }
  })
}

function filterDuplicatePrayers(feelingsPrayersGroups: FeelingsPrayersGroup[]) {
  return feelingsPrayersGroups.map((prayerMap, _, allGroups) => {
    const { prayers, feeling } = prayerMap;
    return {
      feeling,
      prayers: prayers.filter(prayer => {
        // a prayer in a different feeling with a higher score for that feeling
        const higherRatedPrayer = allGroups.find(otherFeelingGroup => {
          if (otherFeelingGroup.feeling.id === feeling.id) {
            return false; // don't match within same feeling
          }
          const otherPrayer = otherFeelingGroup.prayers.find(p => p.id === prayer.id);
          if (!otherPrayer) {
            return false;
          }
          const prayerScore = getPrayerScore(prayer, feeling);
          const otherPrayerScore = getPrayerScore(otherPrayer, otherFeelingGroup.feeling);
          if (otherPrayerScore !== prayerScore) {
            return otherPrayerScore > prayerScore;
          }
          // if scores match, chose later prayer
          return allGroups.indexOf(otherFeelingGroup) > allGroups.indexOf(prayerMap);
        })
        return !higherRatedPrayer; // remove prayer if the same prayer appears in another feeling, but with a higher score
      })
    }
  })
}

export default function getSuggestedPrayers(prayers: Prayer[], wantFeelings: Feeling[]) {
  if (!prayers) {
    return [];
  }

  const suggestedPrayers = getFeelingsPrayersGroups(prayers, wantFeelings)
  return filterDuplicatePrayers(suggestedPrayers);
}