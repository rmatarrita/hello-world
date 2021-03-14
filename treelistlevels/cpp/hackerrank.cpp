#include <iostream>
#include <fstream>
#include <vector>
#include <stack>
#include <string>
#include <ctype.h>

using namespace std;



int** matrix;
int* discardArray;
std::stack<std::pair<int,int>> discardAlternative;

/*
//recursive version without memoization
bool abbreviationTest(string a, string b)
{
    bool result = false;
    int lenA = a.length();
    int lenB = b.length();
    if (lenA == 0 && lenB == 0)
    {
        return true;
    }
    // from end to start...
    // if both characters match, reduce the abbreviation problem to the remaining characters
    if (a[lenA-1] == b[lenB-1])
    {
        result |= abbreviationTest(a.substr(0, lenA-1), b.substr(0, lenB-1));
    }
    // if they don't match, test with uppercasing the lowercase character or removing the lowercase character
    else
    {
        if (islower(a[lenA-1]))
        {
            char lastChar = static_cast<char>(toupper(a[lenA-1]));
            result |= abbreviationTest(a.substr(0, lenA-1), b) ||
                        abbreviationTest(a.substr(0, lenA-1).append(1, lastChar), b);
        }
        else
        {
            result = false;
        }
    }
    return result;
}
*/


// builds all possible solutions from the simplest (terminal cases) to the full
// base recursion cases are converted into values initialized in the array
// the rest of the cells are built by referencing cells that have been previously solved 
bool abbreviationTestIterative(string& a, string& b)
{
    int** matrix;
    bool result = false;
    matrix = new int* [a.length()+1];
    for (long i = 0; i <= a.length(); i++)
    {
        matrix[i] = new int[b.length()+1];
        memset(matrix[i], 0, (b.length()+1)*sizeof(int));
    }    
    // if (ia < 0 && ib < 0) return true; // completed the review and everything matched
    matrix[0][0] = true;
    // if (ia < 0 && ib >= 0) return false ; // ran out of characters in a to match, FALSE
    for (int ib = 1; ib <= b.length(); ib++)
    {
        matrix[0][ib] = false; 
    }
    // if I don't have anymore characters to match but all the characters in a are lowercase
    bool resetValue = true;
    for (int ia = 1; ia <= a.length(); ia++)
    {
        if (isupper(a[ia-1]))
        {
            resetValue = false;;
        }
        matrix[ia][0] = resetValue;
    } 
    // now that all base cases of the recursion have been prepopulated, generate the rest.
    for (int ia = 1; ia <= a.length(); ia++)
    {
        for (int ib = 1; ib <= b.length(); ib++)
        {
            if (a[ia-1] == b[ib-1]) // if both characters are uppercase (the only possible way they can match), reduce the problem
            {
                matrix[ia][ib] = matrix[ia-1][ib-1]; 
            }
            else
            {
                if (islower(a[ia-1]))
                {
                    bool option1 = false; 
                    bool option2 = false;
                    if (toupper(a[ia-1]) == b[ib-1])
                    {
                        option1 =  matrix[ia-1][ib-1];
                    }
                    option2 = matrix[ia-1][ib];
                    matrix[ia][ib] = option1 || option2;
                }
                else
                {
                    matrix[ia][ib] = false;      
                }
            }
        }
    }
    result =  matrix[a.length()][b.length()];
    for (long i = 0; i <= a.length(); i++)
    {
        delete matrix[i];
    }   
    delete matrix;
    return result;
}

bool abbreviationTest3Aux(string& a, string& b, int ia, int ib)
{
    bool result = false;
    if (ia < 0 && ib < 0) // completed the review and everything matched
    {
        return true;
    }
    if (ia < 0 && ib >= 0) // ran out of characters in a to match, FALSE
    {
        return false;
    }
    if (ib < 0)
    {
        int x = ia;
        do 
        {
            if (! islower(a[x--]))
            {
                return false;
            }
        } while (x >= 0);
        return true;
    }
    // from end to start...
    // if both characters match, reduce the abbreviation problem to the remaining characters
    if (matrix[ia][ib] != -1)
    {
        return (matrix[ia][ib] == 1 ? true : false);
    }
    if (a[ia] == b[ib]) // if both characters are uppercase (the only possible way they can match), reduce the problem
    {
        result = abbreviationTest3Aux(a, b, ia-1, ib-1);
    }
    else // if they don't match, test with uppercasing the lowercase character or removing the lowercase character
    {
        if (islower(a[ia]))
        {
            string transformed = a;
            transformed[ia] = toupper(transformed[ia]);
            result = abbreviationTest3Aux(transformed, b, ia, ib) ||
                     abbreviationTest3Aux(a, b, ia-1, ib);
        }
        else
        {
            result = false;
        }
    }
    matrix[ia][ib] = result;
    return result;
}

bool abbreviationTest4(string a, string b)
{
    bool result = abbreviationTestIterative(a,b);
    return result;
}

bool abbreviationTest3(string a, string b)
{
    discardArray = new int[a.length()];
    memset(discardArray, 0, a.length()*sizeof(int));
    matrix = new int*[a.length()];
    for (long i = 0; i < a.length(); i++)
    {
        matrix[i] = new int[b.length()];
        memset(matrix[i], -1, b.length()*sizeof(int));
    }
    bool result = abbreviationTest3Aux(a,b,a.length()-1,b.length()-1);
    for (long i = 0; i < a.length(); i++)
    {
        delete matrix[i];
    }   
    delete discardArray;
    delete matrix;
    return result;
}

string abbreviation(string a, string b) {
    if (abbreviationTestIterative(a,b))
    {
        return "YES";
    }
    else
    {
        return "NO";
    }
}

int main()
{
    //ofstream fout(getenv("OUTPUT_PATH"));
    
    ifstream idatafile("input.txt");
    if (idatafile.is_open())
    {
        string line;
        int q;
        getline(idatafile, line);
        q = stoi(line);

        //cin.ignore(numeric_limits<streamsize>::max(), '\n');

        for (int q_itr = 0; q_itr < q; q_itr++) {
            string a;
            getline(idatafile, a);

            string b;
            getline(idatafile, b);

            string result = abbreviation(a, b);

            std::cout << result << "\n";
        }
        idatafile.close();
    }

    //fout.close();

    return 0;
}
