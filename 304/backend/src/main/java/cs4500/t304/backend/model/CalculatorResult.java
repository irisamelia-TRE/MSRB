package cs4500.t304.backend.model;

import java.util.List;
import java.util.Optional;

/**
 * Object that holds the results of the calculator. Primarily useful for serialization.
 */
public class CalculatorResult {

    private List<RetirementOption> results;

    public List<RetirementOption> getResults() {
        return results;
    }

    public void setResults(
        List<RetirementOption> results) {
        this.results = results;
    }

    /**
     * An individual benefit, or way of expressing a benefit. Has either an amount or a text
     * explanation, but not both.
     */
    public static class Benefit {
        private String name;
        private Optional<Integer> amount;
        private Optional<String> explanation;

        private Benefit() {}

        public Benefit(String name, Integer amount) {
            this.name = name;
            this.amount = Optional.of(amount);
            this.explanation = Optional.empty();
        }

        public Benefit(String name, String explanation) {
            this.name = name;
            this.amount = Optional.empty();
            this.explanation = Optional.of(explanation);
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public Optional<Integer> getAmount() {
            return amount;
        }

        public void setAmount(Optional<Integer> amount) {
            this.amount = amount;
        }

        public Optional<String> getExplanation() {
            return explanation;
        }

        public void setExplanation(Optional<String> explanation) {
            this.explanation = explanation;
        }
    }

    /**
     * An option for retirement. A retiree may choose exactly one option from several.
     */
    public static class RetirementOption {
        private String name;
        private List<Benefit> benefits;

        private RetirementOption() {}

        public RetirementOption(String name, List<Benefit> benefits) {
            this.name = name;
            this.benefits = benefits;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public List<Benefit> getBenefits() {
            return benefits;
        }

        public void setBenefits(List<Benefit> benefits) {
            this.benefits = benefits;
        }
    }

    private CalculatorResult() {}

    public CalculatorResult(List<RetirementOption> results) {
        this.results = results;
    }

}
