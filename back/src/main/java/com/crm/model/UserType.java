package com.crm.model;

public enum UserType {
    ADMIN,
    USER;

    public static String commaSeparated(UserType[] types) {
        StringBuilder result = new StringBuilder();
        for (UserType type : types) {
            result.append(toString(type)).append(',');
        }
        result.deleteCharAt(result.length() - 1);
        return result.toString();
    }

    public static String toString(UserType userType) {
        switch (userType) {
            case ADMIN:
                return "ADMIN";
            case USER:
                return "USER";
        }
        return "";
    }
}
