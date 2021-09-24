package com.crm.model;

public enum Stage {
    PROSPECT,
    FIRSTMEETING,
    DEVELOPMENT,
    POCDEVELOPMENT,
    POCIMPLEMENTATION,
    NEGOTIATION,
    ORDER;

    public static Stage next(Stage stage) {
        switch (stage) {
            case PROSPECT:
                return FIRSTMEETING;
            case FIRSTMEETING:
                return DEVELOPMENT;
            case DEVELOPMENT:
                return POCDEVELOPMENT;
            case POCDEVELOPMENT:
                return POCIMPLEMENTATION;
            case POCIMPLEMENTATION:
                return NEGOTIATION;
            case NEGOTIATION:
                return ORDER;
        }
        return PROSPECT;
    }
}
