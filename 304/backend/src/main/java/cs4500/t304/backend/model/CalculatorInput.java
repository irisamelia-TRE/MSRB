package cs4500.t304.backend.model;

import java.time.LocalDate;
import java.util.Optional;

/**
 * Object that holds all the input the calculator needs. Primarily useful for serialization.
 */
public class CalculatorInput {

    private LocalDate dayOfBirth;
    private LocalDate dayOfRetirement;
    private boolean before2012;
    private int groupNumber;
    private int salaryAverage;
    private boolean militaryVeteran;
    private int monthsOfService;

    private Optional<LocalDate> beneficiaryDoB;

    public LocalDate getDayOfBirth() {
        return dayOfBirth;
    }

    public void setDayOfBirth(LocalDate dayOfBirth) {
        this.dayOfBirth = dayOfBirth;
    }

    public LocalDate getDayOfRetirement() {
        return dayOfRetirement;
    }

    public void setDayOfRetirement(LocalDate dayOfRetirement) {
        this.dayOfRetirement = dayOfRetirement;
    }

    public int getGroupNumber() {
        return groupNumber;
    }

    public void setGroupNumber(int groupNumber) {
        this.groupNumber = groupNumber;
    }

    public int getSalaryAverage() {
        return salaryAverage;
    }

    public void setSalaryAverage(int salaryAverage) {
        this.salaryAverage = salaryAverage;
    }

    public boolean isMilitaryVeteran() {
        return militaryVeteran;
    }

    public void setMilitaryVeteran(boolean militaryVeteran) {
        this.militaryVeteran = militaryVeteran;
    }

    public Optional<LocalDate> getBeneficiaryDoB() {
        return beneficiaryDoB;
    }

    public void setBeneficiaryDoB(Optional<LocalDate> beneficiaryDoB) {
        this.beneficiaryDoB = beneficiaryDoB;
    }

    public int getMonthsOfService() {
        return monthsOfService;
    }

    public void setMonthsOfService(int monthsOfService) {
        this.monthsOfService = monthsOfService;
    }

    public boolean isBefore2012() {
        return before2012;
    }

    public void setBefore2012(boolean before2012) {
        this.before2012 = before2012;
    }
}
