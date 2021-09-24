package com.crm.model;

public enum Stage {
    PROSPECT,
    FIRSTMEETING,
    DEVELOPMENT,
    POCDEVELOPMENT,
    POCINSTALLATION,
    NEGOTIATION,
    ORDER,
    CANCELLED;

    public static Stage next(Stage stage) {
        switch (stage) {
            case PROSPECT:
                return FIRSTMEETING;
            case FIRSTMEETING:
                return DEVELOPMENT;
            case DEVELOPMENT:
                return POCDEVELOPMENT;
            case POCDEVELOPMENT:
                return POCINSTALLATION;
            case POCINSTALLATION:
                return NEGOTIATION;
            case NEGOTIATION:
                return ORDER;
        }
        return PROSPECT;
    }
}
