/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sn.otherclasse;

import javax.xml.bind.annotation.XmlRootElement;


/**
 *
 * @author fallougalass
 */
@XmlRootElement
public class StringBoolean {
    protected Boolean value;

    public StringBoolean() {}
    
    public StringBoolean(Boolean value) {
        this.value = value;
    }

    public Boolean getValue() {
        return value;
    }

    public void setValue(Boolean value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "StringBoolean{" + "value=" + value + '}';
    }
    
    
}
