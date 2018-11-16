/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sn.otherclasse;

import java.util.List;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author fallougalass
 */
@XmlRootElement
public class StringListString {
    protected List<String> value;

    public StringListString() {
    }
    
    public StringListString(List<String> value) {
        this.value = value;
    }

    public List<String> getValue() {
        return value;
    }

    public void setValue(List<String> value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "StringListString{" + "value=" + value + '}';
    }
    
    
}
