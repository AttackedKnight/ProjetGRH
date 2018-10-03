/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sn.otherclasse;

import java.util.List;
import java.util.Objects;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author fallougalass
 */
@XmlRootElement
public class StringListInteger {

    protected List<Integer> value;

    
    public StringListInteger() {
        
    }
    
    public StringListInteger(List<Integer> valeur) {
        this.value = valeur;
    }

    public List<Integer> getValue() {
        return value;
    }

    public void setValue(List<Integer> value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "StringListInteger{" + "value=" + value + '}';
    }

    
    
    
}
